import AWS from 'aws-sdk';

interface Part {
  ETag: string;
  PartNumber: number;
}

export const courseMateBucketName = 'coursemate';

export default class S3ClientService {
  constructor(private s3Client: AWS.S3) {
    // this.s3Client = new AWS.S3({
    //   // endpoint: spacesEndpoint,
    //   endpoint: import.meta.env.VITE_S3_ENDPOINT,
    //   accessKeyId: import.meta.env
    //     .VITE_S3_ACEESS_KEY /* Bucket owner access key id */,
    //   secretAccessKey: import.meta.env
    //     .VITE_S3_SECRET_KEY /* Bucket owner secret */,
    //   // signatureVersion: 'v4',
    //   region: 'eu-north-1',
    //   s3ForcePathStyle: true,
    // });
  }

  //step 1
  public async initiateMultipartUpload(bucketName: string, fileName: string) {
    const params = {
      Bucket: bucketName,
      Key: fileName,
      ACL: 'public-read',
    };

    const res = await this.s3Client.createMultipartUpload(params).promise();
    return res.UploadId;
  }

  //step 2
  public async generatePresignedUrlsParts(
    bucketName: string,
    fileName: string,
    uploadId: string,
    parts: number
  ): Promise<Record<number, string>> {
    const baseParams = {
      Bucket: bucketName,
      Key: fileName,
      UploadId: uploadId,
    };

    const promises = [];

    for (let index = 0; index < parts; index++) {
      promises.push(
        this.s3Client.getSignedUrlPromise('uploadPart', {
          ...baseParams,
          PartNumber: index + 1,
        })
      );
    }

    const res = await Promise.all(promises);

    return res.reduce((map, part, index) => {
      map[index] = part;
      return map;
    }, {} as Record<number, string>);
  }

  public async completeMultipartUpload(
    bucketName: string,
    fileName: string,
    uploadId: string,
    parts: Part[]
  ) {
    const params = {
      Bucket: bucketName,
      Key: fileName,
      UploadId: uploadId,
      MultipartUpload: { Parts: parts },
    };

    return await this.s3Client.completeMultipartUpload(params).promise();
  }

  public async abortMultipartUpload(
    bucketName: string,
    fileName: string,
    uploadId: string
  ) {
    const params = {
      Bucket: bucketName,
      Key: fileName,
      UploadId: uploadId,
    };

    return await this.s3Client.abortMultipartUpload(params).promise();
  }
}

const Client = new AWS.S3({
  // endpoint: spacesEndpoint,
  endpoint: import.meta.env.VITE_S3_ENDPOINT,
  accessKeyId: import.meta.env
    .VITE_S3_ACEESS_KEY /* Bucket owner access key id */,
  secretAccessKey: import.meta.env.VITE_S3_SECRET_KEY /* Bucket owner secret */,
  signatureVersion: 'v4',
  region: 'eu-north-1',
  // s3ForcePathStyle: true,
});

export const s3FileUploadServiceInstance = new S3ClientService(Client);
