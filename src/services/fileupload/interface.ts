export interface IGenerateS3UrlsReq {
  courseId: string;
  fileName: string;
  chunks: number;
}

type IS3PresignedUrls = Record<string, string>;
export interface IGenerateS3UrlsRes {
  presignedUrls: IS3PresignedUrls;
  uploadId: string;
  bucketName: string;
}

export interface IAbortS3UploadReq {
  bucketName: string;
  fileName: string;
  uploadId: string;
}

export interface IS3PartDto {
  ETag: string;
  PartNumber: number;
}

export interface ICompleteS3UploadReq {
  bucketName: string;
  fileName: string;
  uploadId: string;
  parts: IS3PartDto[];
}

export interface ICompleteS3UploadRes {
  Location?: string;
  Bucket?: string;
  Key?: string;
  ETag?: string;
}

export interface IS3UploadResult {
  done?: boolean;
  hasError?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  locationUrl?: string;
}

//event emitters
export interface IS3EmitterError {
  done?: boolean;
  response: Error;
  code: 'FAILED';
}

export interface IS3EmitterSuccess {
  done?: boolean;
  code: 'SUCCESS';
  response: ICompleteS3UploadRes;
  locationUrl: string;
}

//upload func
export interface IS3UploadFunc {
  file: File;
  onPercent?: (percent: number) => void;
  onError?: (error: IS3EmitterError) => void;
  onSuccess?: (response: IS3EmitterSuccess) => void;
}
