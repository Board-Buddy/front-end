'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { passwordCheck } from '@/services/auth';
import { notify } from '@/utils/handleApiError';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PasswordCheckModal = ({ open, setOpen }: Props) => {
  const router = useRouter();
  const [value, setValue] = useState('');

  const handlePasswordCheck = async () => {
    const { status, message } = await passwordCheck(value);

    if (status === 'success') {
      router.push('/my/edit');
    } else {
      notify('passwordCheck', message);
      setValue('');
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>비밀번호 확인</AlertDialogTitle>
          <AlertDialogDescription>
            <span>프로필을 수정하려면 비밀번호를 입력해주세요.</span>
            <Input
              className="mt-2"
              type="password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="비밀번호 입력"
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setValue('')}>
            취소
          </AlertDialogCancel>
          <Button className="text-white" onClick={handlePasswordCheck}>
            확인
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasswordCheckModal;
