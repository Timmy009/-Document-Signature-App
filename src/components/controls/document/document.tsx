import { Text } from '@/components/typography/Text/text';
import { FileObj } from '../preimage/preimage';
import { Button } from '@/components/ui/button';
import { Cancel01Icon } from 'hugeicons-react';
import { CircularProgressBar } from '@/components/primitives/progress/circle';

interface IDocumentProps {
  document: FileObj;
  uploading?: boolean;
  uploadPercent?: number;
  onCancel?(): void;
  isPreUpload?: boolean;
}

export const Document = ({
  document,
  uploading,
  uploadPercent,
  onCancel,
  isPreUpload,
}: IDocumentProps) => {
  return (
    <div className="flex h-20">
      <div className="flex ">
        <div className="bg-primary text-center p-6 rounded-l-xl text-white text-lg font-semibold">
          PDF
        </div>
        <div className="p-3 border border-grey-200  rounded-r-xl">
          <div className="flex items-center">
            <Text
              fontSize="text-base"
              fontWeight="font-semibold"
              isTruncated
              className="overflow-hidden w-44"
            >
              {document?.file?.name}
            </Text>
            {uploading ||
              (isPreUpload && (
                <div className="ml-auto">
                  <Button
                    leftIcon={
                      <Cancel01Icon
                        width="20"
                        height="20"
                        // className="text-primary hover:"
                      />
                    }
                    onClick={onCancel}
                    variant="outline"
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
      </div>
    </div>
  );
};
