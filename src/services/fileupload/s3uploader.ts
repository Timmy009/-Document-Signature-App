import Axios, {
  AxiosRequestConfig,
  AxiosProgressEvent,
  AxiosResponse,
} from 'axios';
import {
  ICompleteS3UploadRes,
  IGenerateS3UrlsRes,
  IS3EmitterError,
  IS3EmitterSuccess,
  IS3PartDto,
  IS3UploadResult,
} from './interface';
import { fileUploadServiceInstance } from './service';
import { formatFilename, formatS3LocationUrl } from './util';
import CustomEventEmitter from '../events/event-emitter';
import promisify from '@/lib/promise';

export default class S3FileUploader extends CustomEventEmitter {
  chunkSize: number;
  done: boolean;
  chunkIndex: number;
  currentChunkStartByte: number;
  file: File;
  s3UrlsResult: IGenerateS3UrlsRes | undefined;
  s3Parts: IS3PartDto[];
  fileName: string;
  //static chunkSize = 5 * 1024 * 1024; //5Mb
  constructor(file: File) {
    super();
    this.file = file;
    this.chunkSize = 5 * 1024 * 1024; //5Mb
    this.chunkIndex = 0;
    this.currentChunkStartByte = 0;
    this.done = false;
    this.s3UrlsResult = undefined;
    this.s3Parts = [];
    this.fileName = formatFilename(file.name);
  }

  private getPercentage(event: AxiosProgressEvent, file: File): number {
    if (file.size <= this.chunkSize) {
      const percentage = event.total
        ? Math.ceil((event.loaded / event.total) * 100)
        : 0;
      return percentage;
    }
    return 0;
  }

  private blobToFile(theBlob: Blob, mainFile: File): File {
    //create new file from blob
    return new File([theBlob], formatFilename(mainFile.name), {
      lastModified: mainFile.lastModified,
    });
  }

  public async generateUrls(courseId?: string) {
    const totalChunks = Math.ceil(this.file.size / this.chunkSize);
    const [err, result] = await promisify<Error, IGenerateS3UrlsRes>(
      fileUploadServiceInstance.generateS3UploadUrls({
        courseId: courseId!,
        fileName: this.fileName,
        chunks: totalChunks,
      })
      // s3FileUploadServiceInstance.generatePresignedUrlsParts({
      //   hostId: hostId,
      //   fileName: this.fileName,
      //   chunks: totalChunks,
      // })
    );
    if (err) {
      this.emit<IS3EmitterError>('error', {
        done: false,
        response: err,
        code: 'FAILED',
      });
      return Promise.reject(err);
    }

    this.s3UrlsResult = result;
    return Promise.resolve(result);
  }

  public async uploadFile(
    axiosParams?: AxiosRequestConfig
  ): Promise<IS3UploadResult> {
    //check that we already have s3 generated urls
    if (!this.s3UrlsResult || !this.s3UrlsResult.presignedUrls) {
      const nErr = new Error('S3 presigned URLs were not found');
      this.emit<IS3EmitterError>('error', {
        done: false,
        response: nErr,
        code: 'FAILED',
      });
      return { hasError: true, error: nErr };
    }

    const mappedUrls = Object.values(this.s3UrlsResult.presignedUrls);
    const nextS3url = mappedUrls[this.chunkIndex];

    const next_slice = this.currentChunkStartByte + this.chunkSize;
    const totalChunks = Math.ceil(this.file.size / this.chunkSize);
    const chunk: Blob = this.file.slice(this.currentChunkStartByte, next_slice);
    //convert chunk to File object because Joinder server does not accept application/octet-stream
    //we could have also used XMLHTTPRequest and overrideMimeType()
    const newChunkFile = this.blobToFile(chunk, this.file);

    //create the promise
    const promise = new Promise<{ done: boolean; apiResult: AxiosResponse }>(
      (resolve, reject) => {
        (async () => {
          try {
            const axios = Axios.create();
            //delete axios.defaults.headers.put['Content-Type'];
            const apiResult = await axios.put(nextS3url, newChunkFile, {
              ...axiosParams,
              onUploadProgress: (event: AxiosProgressEvent) => {
                const percentComplete = this.getPercentage(event, this.file);
                if (percentComplete) this.emit('progress', percentComplete);
              },
            });

            //add to s3 parts
            //in other to get the ETag, I had to update the S3 Bucket CORS to include <ExposeHeader>ETag</ExposeHeader>
            //using: *** s3cmd setcors s3cors.xml s3://viajio-dev ***. This had to be configured on my PC. Helpful links:
            //https://www.digitalocean.com/community/questions/how-to-get-spaces-pre-signed-url-working-with-cors
            //https://community.transloadit.com/t/uppy-aws-s3-multipart-upload-with-digitalocean-spaces/15475/2
            //https://docs.digitalocean.com/products/spaces/resources/s3cmd/
            //https://help.dreamhost.com/hc/en-us/articles/216201557-Configuring-CORS-on-a-DreamObjects-bucket
            this.s3Parts.push({
              ETag: apiResult.headers.etag,
              PartNumber: this.chunkIndex + 1,
            });

            if (next_slice < this.file.size) {
              const size_done = this.currentChunkStartByte + this.chunkSize;
              const percent_done = Math.floor(
                (size_done / this.file.size) * 100
              );
              this.emit('progress', percent_done);

              this.chunkIndex =
                this.chunkIndex < totalChunks
                  ? this.chunkIndex + 1
                  : totalChunks;

              this.currentChunkStartByte = next_slice;
              this.done = false;
              resolve({ done: this.done, apiResult });
            } else {
              this.emit('progress', 100); //100% complete
              this.done = true;
              resolve({ done: this.done, apiResult });
            }
          } catch (err) {
            reject(err);
          }
        })();
      }
    );

    //process the promise
    const [err, result] = await promisify(promise);
    if (err) {
      if (Axios.isCancel(err)) {
        console.log('Axios Cancelled Request');

        //call s3 abort URL
        await promisify(
          fileUploadServiceInstance.abortS3Upload({
            fileName: this.fileName,
            uploadId: this.s3UrlsResult.uploadId,
            bucketName: this.s3UrlsResult.bucketName,
          })
        );
      }
      this.emit<IS3EmitterError>('error', {
        done: false,
        response: err,
        code: 'FAILED',
      });
      return { hasError: true, error: err };
    }

    //process next chunk
    if (!result?.done) return this.uploadFile(axiosParams);

    //call s3 completed
    const [resErr, cResult] = await promisify<Error, ICompleteS3UploadRes>(
      fileUploadServiceInstance.completeS3Upload({
        bucketName: this.s3UrlsResult.bucketName,
        uploadId: this.s3UrlsResult.uploadId,
        fileName: this.fileName,
        parts: this.s3Parts,
      })
    );
    if (resErr) {
      this.emit<IS3EmitterError>('error', {
        done: false,
        response: resErr,
        code: 'FAILED',
      });
      return { hasError: true, error: resErr };
    }

    //chunk is finally complete
    const locationUrl = formatS3LocationUrl(cResult.Location || '');
    this.emit<IS3EmitterSuccess>('done', {
      done: true,
      code: 'SUCCESS',
      response: cResult,
      locationUrl,
    });
    return { done: true, hasError: false, locationUrl };
  }
}
