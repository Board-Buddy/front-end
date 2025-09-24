'use client';

import { Button } from '@/components/ui/button';
import useAppRouter from '@/hooks/custom/useAppRouter';
import useIsWebView from '@/hooks/custom/useIsWebView';
import { useLoginRequiredAction } from '@/hooks/custom/useLoginRequiredAction';
import { cn } from '@/utils/tailwind';
import { PlusIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

const WriteButton = () => {
  const pathname = usePathname();
  const router = useAppRouter();

  const isWebView = useIsWebView();

  const { runIfLoggedIn } = useLoginRequiredAction();

  const handleClick = () => {
    runIfLoggedIn(() => {
      router.push({
        href: '/article/write',
        headerTitle: '모집글 작성',
      });
    });
  };

  // 홈 화면에서만 보인다.
  if (!pathname.includes('home')) {
    return null;
  }

  return (
    <div
      className={cn(
        'absolute bottom-20 right-4',
        isWebView ? 'bottom-4' : 'bottom-20',
      )}
    >
      <Button
        aria-label="모집글 작성"
        className="size-12 rounded-full border-none bg-primary p-0 shadow-md"
        onClick={handleClick}
      >
        <PlusIcon color="white" size={24} />
      </Button>
    </div>
  );
};

export default WriteButton;
