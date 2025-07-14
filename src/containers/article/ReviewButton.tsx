'use client';

import AppLink from '@/components/AppLink';
import { Button } from '@/components/ui/button';
import { Article } from '@/types/article';
import { cn } from '@/utils/tailwind';

const ReviewButton = ({ articleId }: { articleId: Article['id'] }) => {
  return (
    <AppLink href={`${articleId}/reviews`} headerTitle="후기 작성">
      <div className="mb-8 px-4">
        <Button
          className={cn('w-full text-white font-bold text-base h-12 shadow-md')}
        >
          후기 작성
        </Button>
      </div>
    </AppLink>
  );
};

export default ReviewButton;
