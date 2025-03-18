import promisify from '@/lib/promise';
import { IS3UploadFunc } from './interface';
import S3FileUploader from './s3uploader';

export async function s3Upload({
  file,
  onPercent,
  onError,
  onSuccess,
}: IS3UploadFunc) {
  const uploader = new S3FileUploader(file);
  uploader.on('progress', onPercent);
  uploader.on('error', onError);
  uploader.on('done', onSuccess);

  //generate s3 presigned urls
  const [err] = await promisify(uploader.generateUrls());
  if (err) throw new Error('Failed to generate Urls');

  //upload file with the presigned urls in chunks
  const [fErr, fResult] = await promisify(uploader.uploadFile());
  if (fErr) throw new Error('Error with file upload');

  return fResult;
}
