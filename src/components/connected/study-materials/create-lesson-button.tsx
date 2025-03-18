import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

interface ICreateLessonButtonProps {
  loading?: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
  triggerDisabled?: boolean;
  onSubmit: (publishType: 'organisation' | 'public') => void;
}

export const CreateLessonButton: React.FC<ICreateLessonButtonProps> = ({
  onSubmit,
  loading,
  disabled,
  triggerDisabled,
  open,
  setOpen,
}) => {
  const [publishType, setPublishType] = useState<'organisation' | 'public'>(
    'public'
  );

  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogTrigger disabled={triggerDisabled} asChild className="w-full">
        <Button disabled={triggerDisabled}>Proceed</Button>
      </DialogTrigger>
      <DialogContent className="group:justify-center text-center">
        <DialogHeader className="justify-center">
          <DialogTitle className="text-center">Public Lesson('s)</DialogTitle>
        </DialogHeader>
        \{' '}
        <DialogFooter className="pt-3 gap-4">
          <Button
            fullWidth
            variant="outline_base"
            disabled={disabled}
            loading={loading && publishType == 'organisation'}
            onClick={async () => {
              setPublishType('organisation');
              onSubmit('organisation');
              // setOpen(false);
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
              // setOpen(false);
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
