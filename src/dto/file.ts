export type IFileObj = { file: File; url: string };
export type IFileStatus =
  | 'pending'
  | 'uploading'
  | 'error'
  | 'done'
  | 'cancelled';
export type IDroppedFileObj = {
  id: string;
  object: IFileObj;
  status: IFileStatus;
};
