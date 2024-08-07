'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useWithdrawal } from '@/hooks/useAuth';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const WithdrawalAlertModal = ({ open, setOpen }: Props) => {
  const mutation = useWithdrawal();

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className="w-full" />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말 탈퇴하시겠어요?</AlertDialogTitle>
          <AlertDialogDescription>
            그동안의 모든 기록이 삭제되며, 복구 불가능합니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>아니요</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutation.mutate()}>
            네
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WithdrawalAlertModal;
