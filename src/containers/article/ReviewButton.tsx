'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/tailwind';

const ReviewButton = ({ articleId }: { articleId: number }) => {
  const handleClick = () => {};

  return (
    <div className="px-4 mb-8">
      <Button
        className={cn('w-full text-white font-bold text-md h-12 shadow-md')}
        onClick={handleClick}
      >
        후기 작성
      </Button>
    </div>
  );
};

export default ReviewButton;
