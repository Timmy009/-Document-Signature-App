import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

interface ICreateQuestionsButtonProps {
  loading?: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
  // triggerDisabled?: boolean;
  onSubmit: (publishType: 'organisation' | 'public') => void;
}

export const CreateQuestionsButton: React.FC<ICreateQuestionsButtonProps> = ({
  onSubmit,
  loading,
  disabled,
  open,
  setOpen,
}) => {
  const [publishType, setPublishType] = useState<'organisation' | 'public'>(
    'public'
  );

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogContent className="group:justify-center text-center">
        <DialogHeader className="justify-center">
          <DialogTitle className="text-center">
            Public Questions('s)
          </DialogTitle>
        </DialogHeader>{' '}
        <DialogFooter className="pt-3 gap-4">
          <Button
            fullWidth
            variant="outline_base"
            disabled={disabled}
            loading={loading && publishType == 'organisation'}
            onClick={async () => {
              setPublishType('organisation');
              onSubmit('organisation');
            }}
            type="submit"
          >
            Publish to organization
          </Button>
          <Button
            disabled={disabled}
            loading={loading && publishType == 'public'}
            fullWidth
            onClick={() => {
              setPublishType('public');
              onSubmit('public');
            }}
            type="submit"
          >
            Public
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
