'use client';

import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from './ui/dialog';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const LoginPromptModal = ({ open, onOpenChange }: Props) => {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogDescription className="px-6 pb-2 text-center text-base font-semibold text-gray-800">
            이 기능은 로그인 후 이용할 수 있어요. <br />
            지금 로그인하시겠어요?
          </DialogDescription>
        </DialogHeader>
        <div className="flex grow text-center">
          <div
            className="h-10 w-full cursor-pointer place-content-center rounded-bl-lg bg-gray-300 text-sm font-semibold"
            onClick={() => onOpenChange(false)}
          >
            <p>취소</p>
          </div>
          <div
            className="w-full cursor-pointer place-content-center rounded-br-lg bg-primary text-sm font-semibold text-white"
            onClick={() => router.push('/login-splash')}
          >
            <p>로그인하기</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPromptModal;
