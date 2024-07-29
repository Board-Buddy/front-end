import { Button } from '@/components/ui/button';
import { useCancelParticipation } from '@/hooks/useParticipation';
import { cn } from '@/utils/tailwind';
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
import { useQueryClient } from '@tanstack/react-query';
import { UserInfo } from '@/types/user';
import { useState } from 'react';

interface Props {
  articleId: number;
  startDateTime: string;
}

const CancelButtonForApproved = ({ articleId, startDateTime }: Props) => {
  const cache = useQueryClient();
  const userInfo = cache.getQueryData(['userInfo']) as UserInfo;
  const { nickname } = userInfo;

  const [open, setOpen] = useState(false);
  const cancelMutation = useCancelParticipation(articleId.toString());

  const handleClick = () => {
    const startTime = new Date(startDateTime);
    const currentTime = new Date();

    const timeDifference = startTime.getTime() - currentTime.getTime();

    // 두 시간의 차이가 2시간 이내인지 확인
    if (timeDifference <= 7200000) {
      setOpen(true);
    } else {
      cancelMutation.mutate();
    }
  };

  return (
    <>
      <div className="px-4 mb-8">
        <Button
          className={cn('w-full text-white font-bold text-md h-12 shadow-md')}
          onClick={handleClick}
        >
          참가 취소
        </Button>
      </div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger className="w-full" />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>정말 취소하시겠어요?</AlertDialogTitle>
            <AlertDialogDescription>
              이미 참가가 승인된 모임입니다.
              <br />
              다들 {nickname}님과의 즐거운 만남을 기대하고 있어요!
              <br />
              지금 취소하시면 버디지수가 하락합니다🥲
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>아니요</AlertDialogCancel>
            <AlertDialogAction onClick={() => cancelMutation.mutate()}>
              네
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CancelButtonForApproved;
