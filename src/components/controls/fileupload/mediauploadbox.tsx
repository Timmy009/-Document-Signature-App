import { Text } from '@/components/typography/Text/text';
import { Divider } from '@/components/ui/divider';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { filterFilesByType, getFileObjFromList } from '@/lib/files';
import { cn } from '@/lib/utils';
import { CourseIcon, Book04Icon, FileUploadIcon } from 'hugeicons-react';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';

const containerClass = cn(
  'w-full',
  'rounded-lg',
  'border-2',
  'border-dashed',
  'border-grey-200',
  'bg-neutral-00',
  'p-8'
);
const activeDropBg = cn('bg-grey-200');

const triggerAssetsn = [
  { icon: <CourseIcon color="#1aa7ec" size={24} className="m-auto" /> },
  { icon: <Book04Icon color="#FF3F3F" size={24} className="m-auto" /> },
  { icon: <FileUploadIcon color="#FF3F3F" size={24} className="m-auto" /> },
];

type FileObj = { file: File; url: string };
interface IProps {
  onDropFiles: (files: FileObj[]) => void;
}
export const MediaFileUploadBox = ({ onDropFiles }: IProps) => {
  // const [fileName, setFileName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [{ canDrop, isOver }, dropRef] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item: { files: File[] }) {
        const filtered = filterFilesByType(item.files, ['image']);
        // console.log(fil, '==> files');

        handleFilesDrop(filtered);
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [onDropFiles]
  );
  //handle files drop
  const handleFilesDrop = useCallback(
    async (files: File[]) => {
      const filtered = filterFilesByType(files, ['image']);
      const result = await getFileObjFromList(filtered as unknown as FileList);

      if (!result || !result.length) return;
      console.log(result, 'result');

      // if (result?.[0].file) {
      //   setFileName(result?.[0].file.name);
      // }
      if (onDropFiles) onDropFiles(result);
    },
    [onDropFiles]
  );
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
      if (onDropFiles) onDropFiles(result);
    },
    [onDropFiles]
  );
  const baseContainerClass = cn(containerClass, {
    [activeDropBg]: isOver,
  });

  // useEffect(() => {
  //   if (inputRef.current?.files?.[0]) {
  //     setFileName(inputRef.current?.files[0].name);
  //   }
  // }, [inputRef.current?.files]);

  return (
    <div className={baseContainerClass} ref={dropRef}>
      <div className="w-full flex flex-col text-center space-y-3 max-w-xs m-auto">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex gap-2 w-full justify-center">
              {triggerAssetsn.map(({ icon }, index) => (
                <div
                  role="button"
                  className="border border-border w-fit self-center py-3 px-6 rounded-lg  hover:bg-grey-50"
                  onClick={handleButtonClick}
                  key={index}
                >
                  {icon}
                </div>
              ))}
            </div>
          </TooltipTrigger>
          <TooltipContent>Click to Browse Files</TooltipContent>
        </Tooltip>
        <div className="w-36 m-auto">
          <Divider label="OR"></Divider>
        </div>
        <Text asComp="span" fontSize="text-lg">
          Drag and drop your video, pdf here to start uploading
          <br />
          <Text asComp="span" fontSize="text-sm" textColor="text-grey-300">
            File types: .mp4, .pdf, and .mov
          </Text>
        </Text>

        {/* {fileName && (
          <Text fontSize="text-sm" className="text-pretty w-[320px] py-0">
            {fileName}
          </Text>
        )} */}

        <input
          type="file"
          multiple
          name="file"
          accept=".pdf, .mov, .mp4, audio/*" //we don't want to accept all file types
          ref={inputRef}
          className="hidden"
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};
