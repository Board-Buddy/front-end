'use client';

import { Button } from '@/components/ui/button';
import { useLoginRequiredAction } from '@/hooks/custom/useLoginRequiredAction';
import { isWebView } from '@/utils/isWebView';
import { cn } from '@/utils/tailwind';
import { PlusIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const WriteButton = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { runIfLoggedIn } = useLoginRequiredAction();

  const handleClick = () => {
    runIfLoggedIn(() => {
      router.push('/article/write');
    });
  };

  // 홈 화면에서만 보인다.
  if (!pathname.includes('home')) return;

  return (
    <div
      className={cn(
        'absolute bottom-20 right-4',
        isWebView() ? 'bottom-4' : 'bottom-20',
      )}
    >
      <Button
        className="size-12 rounded-full border-none bg-primary p-0 shadow-md"
        onClick={handleClick}
      >
        <PlusIcon color="white" size={24} />
      </Button>
    </div>
  );
};

export default WriteButton;
