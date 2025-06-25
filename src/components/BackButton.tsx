'use client';

import { cn } from '@/utils/tailwind';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  className?: string;
}

const BackButton = ({ className }: Props) => {
  const router = useRouter();

  return (
    <button
      type="button"
      aria-label="뒤로가기"
      className={cn('cursor-pointer', className)}
      onClick={router.back}
    >
      <ChevronLeft className="size-5" />
    </button>
  );
};

export default BackButton;
