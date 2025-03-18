import { CircularProgressBar } from '@/components/primitives/progress/circle';
import { Text } from '@/components/typography/Text/text';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Cancel01Icon } from 'hugeicons-react';

export type FileObj = {
  file: File;
  url: string;
};

interface IPreImageProps {
  onCancel: () => void;
  document: FileObj;
  id: string;
  className?: string;
}

export const PreImage = ({
  id,
  document,
  onCancel,
  className,
}: IPreImageProps) => {
  return (
    <div className="flex gap-2 min-w-max">
      <img
        src={document.url}
        width="120"
        height="80"
        alt={document.file.name}
        // layout="fixed"
        // objectFit="cover" // change to suit your needs
        className={cn('rounded-lg', className)}
        id={id}
      />
      <Button
        leftIcon={<Cancel01Icon width="16" height="16" />}
        // className="absolute right-1 top-1"
        onClick={onCancel}
        variant="outline_base"
        size="icon"
      />
    </div>
  );
};

interface IVideoPreviewProps {
  url: string;
}
export const VideoPreview = ({ url }: IVideoPreviewProps) => {
  return (
    <video
      className="w-full h-full"
      onLoadedMetadata={
        (event) => (event.currentTarget.currentTime = 1) //this sets the start time of the video so it doesn't display blank screen in some cases
      }
    >
      <source src={url} />
    </video>
  );
};

interface IPreVideoProps extends IPreImageProps {
  uploading?: boolean;
  uploadPercent?: number;
  isPreUpload?: boolean;
}

export const PreVideo = ({
  id,
  document,
  onCancel,
  uploadPercent,
  uploading,
  isPreUpload,
}: IPreVideoProps) => {
  return (
    <div className="relative min-w-full">
      <div className="flex gap-2">
        <video
          className="w-full h-full"
          onLoadedMetadata={
            (event) => (event.currentTarget.currentTime = 1) //this sets the start time of the video so it doesn't display blank screen in some cases
          }
          id={id}
        >
          <source src={document.url} />
        </video>

        {uploading ||
          (isPreUpload && (
            <div>
              <Button
                leftIcon={<Cancel01Icon width="20" height="20" />}
                onClick={onCancel}
                variant="outline_base"
                size="icon"
              />
            </div>
          ))}
      </div>

      {!uploading && (
        <Text fontSize="text-sm" fontWeight="font-light">
          {(document.file?.size / 10000).toFixed(2)} MB
        </Text>
      )}
      {!!uploading && (
        <div className="flex space-x-2 place-items-center">
          <Text fontStyle="italic" fontWeight="font-light">
            Uploading
          </Text>
          <CircularProgressBar progress={uploadPercent || 0} />
        </div>
      )}
    </div>
  );
};
