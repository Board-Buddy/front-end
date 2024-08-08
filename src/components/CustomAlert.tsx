import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/utils/tailwind';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  cancelText?: string;
  confirmText: string;
}

const CustomAlert = ({
  open,
  setOpen,
  title,
  description,
  onConfirm,
  onCancel,
  cancelText,
  confirmText,
}: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>
              <p dangerouslySetInnerHTML={{ __html: description }} />
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          {cancelText && (
            <AlertDialogCancel onClick={() => onCancel && onCancel()}>
              {cancelText}
            </AlertDialogCancel>
          )}
          <AlertDialogAction
            onClick={() => onConfirm()}
            className={cn(!cancelText && 'w-full mt-4')}
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlert;
