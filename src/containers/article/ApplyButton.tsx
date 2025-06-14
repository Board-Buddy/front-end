'use client';

import { Button } from '@/components/ui/button';
import { useApplyParticipation } from '@/hooks/useParticipation';
import { Article } from '@/types/article';
import { cn } from '@/utils/tailwind';

const ApplyButton = ({ articleId }: { articleId: Article['id'] }) => {
  const applyMutation = useApplyParticipation(articleId);

  const handleClick = () => {
    applyMutation.mutate();
  };

  return (
    <div className="mb-8 px-4">
      <Button
        className={cn('w-full text-white font-bold text-base h-12 shadow-md')}
        onClick={handleClick}
      >
        참가 신청
      </Button>
    </div>
  );
};

export default ApplyButton;
