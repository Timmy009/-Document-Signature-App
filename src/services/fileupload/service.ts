import { AxiosInstance } from 'axios';
import {
  IAbortS3UploadReq,
  ICompleteS3UploadReq,
  ICompleteS3UploadRes,
  IGenerateS3UrlsReq,
  IGenerateS3UrlsRes,
} from './interface';
import axiosInstance from '../axios';
import S3ClientService, { s3FileUploadServiceInstance } from '../s3client';
import { createId } from '@paralleldrive/cuid2';

const currentEnv = import.meta.env.PROD || 'development';
// const currentEnv = 'development';

export default class FileUploadService {
  axios: AxiosInstance;
  s3ClientService: S3ClientService;
  constructor() {
    this.axios = axiosInstance;
    this.s3ClientService = s3FileUploadServiceInstance;
  }

  public async GetCourseS3UploadBucket(courseId: string) {
    return `${import.meta.env.VITE_S3_BUCKET}/${currentEnv}/${
      courseId ?? createId()
    }/${createId()}`;
  }
  public async GetUserS3UploadBucket(userId: string) {
    return `${
      import.meta.env.VITE_S3_BUCKET
    }/${currentEnv}/${userId}/${createId()}`;
  }

  public async generateS3UploadUrls(
    data: IGenerateS3UrlsReq //number of chunks
  ): Promise<IGenerateS3UrlsRes> {
    const { fileName, chunks } = data;

    //get bucket name
    const bucketName = await this.GetCourseS3UploadBucket(data.courseId);
    const { uploadId, presignedUrls } = await this.getS3UploadIdAndUrls(
      bucketName,
      fileName,
      chunks
    );

    return { presignedUrls, uploadId: uploadId ?? '', bucketName };
  }

  public async abortS3Upload(data: IAbortS3UploadReq) {
    const { bucketName, fileName, uploadId } = data;
    return await this.s3ClientService.abortMultipartUpload(
      bucketName,
      fileName,
      uploadId
    );
  }

  public async completeS3Upload(
    data: ICompleteS3UploadReq
  ): Promise<ICompleteS3UploadRes> {
    const { bucketName, fileName, uploadId, parts } = data;

    return await this.s3ClientService.completeMultipartUpload(
      bucketName,
      fileName,
      uploadId,
      parts
    );
  }

  private async getS3UploadIdAndUrls(
    bucketName: string,
    fileName: string,
    chunks: number
  ) {
    //get upload Id
    const uploadId = await this.s3ClientService.initiateMultipartUpload(
      bucketName,
      fileName
    );
    //get presigned urls
    const presignedUrls = await this.s3ClientService.generatePresignedUrlsParts(
      bucketName,
      fileName,
      uploadId!,
      chunks
    );

    return { presignedUrls, uploadId };
  }
}

export const fileUploadServiceInstance = new FileUploadService();
