import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { SuccessCheck } from '../icons/generated';

interface IUploadSuccessDialogProps {
  open: boolean;
  type?: 'question' | 'lessons';
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UploadSuccessDialog: React.FC<
  React.PropsWithChildren<IUploadSuccessDialogProps>
> = ({ open, setOpen, type = 'question', children }) => {
  const navigate = useNavigate();
  return (
    <Dialog modal open={open} onOpenChange={setOpen}>
      <DialogContent className="group:justify-center text-center">
        <DialogHeader className="justify-center">
          <div className="flex justify-center mb-2">
            <SuccessCheck className="w-[138px] h-[135px] max-md:w-[98px] max-md:h-[96px]" />
          </div>
          <DialogTitle className="text-center">
            You’ve successfully posted {type}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>{children}</DialogDescription>
        <DialogFooter className="pt-3 gap-4">
          <Button fullWidth variant="outline_base" disabled={true}>
            Invite
          </Button>
          <Button
            fullWidth
            onClick={() => {
              navigate('/upload');
              setOpen(false);
            }}
          >
            My Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
