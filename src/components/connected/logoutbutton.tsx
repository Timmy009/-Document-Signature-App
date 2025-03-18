import { DialogTrigger } from '@radix-ui/react-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { SidebarMenuButton } from '../ui/sidebar';
import { Logout03Icon } from 'hugeicons-react';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface ILogoutbuttonProps {
  onClick: () => void;
  loading?: boolean;
}

export const Logoutbutton = ({ loading, onClick }: ILogoutbuttonProps) => {
  const [open, setOpen] = useState(false);
  const title = 'Log out';
  return (
    <Dialog modal open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger onClick={() => setOpen(true)}>
        <SidebarMenuButton variant="danger" asChild tooltip={title}>
          <Link
            to="#"
            className="flex items-center text-error space-x-1 hover:no-underline"
          >
            <Logout03Icon className="text-error" size={20} strokeWidth={2} />
            <span>{title}</span>
          </Link>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent className="group:justify-center text-center">
        <DialogHeader className="justify-center">
          <DialogTitle className="text-center">{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>Are you sure you want to Log out?</DialogDescription>
        <DialogFooter className="pt-3 gap-4">
          <Button
            fullWidth
            variant="destructive"
            disabled={loading}
            onClick={() => setOpen(false)}
          >
            No
          </Button>
          <Button
            disabled={loading}
            loading={loading}
            fullWidth
            onClick={onClick}
          >
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
