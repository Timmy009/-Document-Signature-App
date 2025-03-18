// import { AnimatedPresenceLayout } from '@/components/layouts/animated-presence';
// import { Button } from '@/components/ui/button';
// import { CardButton } from '@/components/ui/card-button';
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Add01Icon, Book02Icon } from 'hugeicons-react';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';



// interface ICreateUploadDialogProps {
//   onContinue?: (value: FormType) => void;
// }

// export const CreateUploadDialog = ({
//   onContinue,
// }: ICreateUploadDialogProps) => {
//   const [open, setOpen] = useState(false);
//   const [step, setStep] = useState(1);
 

// const navigate = useNavigate()



//   return (
//     <Dialog
//       modal
//       open={open}
//       onOpenChange={() => {
//         setOpen(!open);
//         setStep(1);
//       }}
//     >
//       <div >
//         <Button onClick={navigate(
//       'add-study-material'
    
//       )} leftIcon={<Add01Icon />}>Upload</Button>
//       </div>
     
//     </Dialog>
//   );
// };
