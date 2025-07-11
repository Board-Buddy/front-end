'use client';

import { Button } from '@/components/ui/button';
import { Article } from '@/types/article';
import { cn } from '@/utils/tailwind';
import Link from 'next/link';

const ReviewButton = ({ articleId }: { articleId: Article['id'] }) => {
  return (
    <Link href={`${articleId}/reviews`}>
      <div className="mb-8 px-4">
        <Button
          className={cn('w-full text-white font-bold text-base h-12 shadow-md')}
        >
          후기 작성
        </Button>
      </div>
    </Link>
  );
};

export default ReviewButton;
