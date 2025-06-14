import { Button } from '@/components/ui/button';
import { useCancelParticipation } from '@/hooks/useParticipation';
import { cn } from '@/utils/tailwind';
import { useQueryClient } from '@tanstack/react-query';
import { UserInfo } from '@/types/user';
import { useState } from 'react';
import CustomAlert from '@/components/CustomAlert';
import { Article } from '@/types/article';

interface Props {
  articleId: Article['id'];
  startDateTime: Article['startDateTime'];
}

const CancelButtonForApproved = ({ articleId, startDateTime }: Props) => {
  const cache = useQueryClient();
  const userInfo = cache.getQueryData(['userInfo']) as UserInfo;
  const { nickname } = userInfo;

  const [open, setOpen] = useState(false);
  const cancelMutation = useCancelParticipation(articleId);

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
      <div className="mb-8 px-4">
        <Button
          className={cn('w-full text-white font-bold text-base h-12 shadow-md')}
          onClick={handleClick}
        >
          참가 취소
        </Button>
      </div>
      <CustomAlert
        open={open}
        setOpen={setOpen}
        title="정말 취소하시겠어요?"
        description={`이미 참가가 승인된 모임입니다.
              <br />
              다들 ${nickname}님과의 즐거운 만남을 기대하고 있어요!
              <br />
              지금 취소하시면 버디지수가 하락합니다🥲`}
        cancelText="아니요"
        confirmText="네"
        onConfirm={() => cancelMutation.mutate()}
      />
    </>
  );
};

export default CancelButtonForApproved;
