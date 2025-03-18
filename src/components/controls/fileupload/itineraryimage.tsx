import { CircularProgressBar } from '@/components/primitives/progress/circle';
import { IFileObj } from '@/dto/file';
import { getFileObjFromList } from '@/lib/files';
import { Cancel01Icon, Pulse01Icon } from 'hugeicons-react';
import React, { ChangeEvent, ReactNode, useCallback, useRef } from 'react';

interface IProps {
  imageUrl?: string | null;
  progress?: number;
  hoverFragment?: ReactNode;
  onDropFile: (file: IFileObj) => void;
  onRemoveFile: () => void;
}
export const ItineraryImageUploadBox = ({
  imageUrl,
  progress,
  // hoverFragment,
  onDropFile,
  onRemoveFile,
}: IProps) => {
  console.log({ progress });
  const inputRef = useRef<HTMLInputElement>(null);
  //handle browse files
  const handleButtonClick = useCallback(() => {
    if (inputRef && inputRef.current) {
      inputRef.current?.click();
    }
  }, []);
  //handle file pick
  const handleInputChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const fileslist = e.target.files;
      const result = await getFileObjFromList(fileslist);
      if (!result || !result.length) return;
      if (onDropFile) onDropFile(result[0]);
    },
    [onDropFile]
  );
  return (
    <React.Fragment>
      <div
        className="w-28 h-28 bg-grey-100 border rounded border-dashed border-grey-400 cursor-pointer justify-center items-center inline-flex group relative"
        onClick={handleButtonClick}
      >
        {imageUrl ? (
          <img className="w-full h-full object-cover" src={imageUrl} alt="" />
        ) : (
          <Pulse01Icon width={24} height={24} />
        )}

        {!!imageUrl && (
          <div
            className="absolute top-0 rounded transition duration-200 ease-in-out w-full h-full bg-black opacity-0 group-hover:opacity-80"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-full flex items-center justify-center relative">
              {progress ? <CircularProgressBar progress={progress} /> : null}
            </div>
            <Cancel01Icon
              width={16}
              height={16}
              onClick={onRemoveFile}
              className="text-white right-1 top-1 absolute cursor-auto"
            />
          </div>
        )}
      </div>
      <input
        type="file"
        multiple={false}
        name="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleInputChange}
      />
    </React.Fragment>
  );
};
