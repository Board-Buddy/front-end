'use client';

import { Button } from '@/components/ui/button';
import { useApplyParticipation } from '@/hooks/useParticipation';
import { cn } from '@/utils/tailwind';

const ApplyButton = ({ articleId }: { articleId: number }) => {
  const applyMutation = useApplyParticipation(articleId);

  const handleClick = () => {
    applyMutation.mutate();
  };

  return (
    <div className="px-4 mb-8">
      <Button
        className={cn('w-full text-white font-bold text-md h-12 shadow-md')}
        onClick={handleClick}
      >
        참가 신청
      </Button>
    </div>
  );
};

export default ApplyButton;
