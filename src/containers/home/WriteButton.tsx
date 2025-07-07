'use client';

import { Button } from '@/components/ui/button';
import { useLoginRequiredAction } from '@/hooks/custom/useLoginRequiredAction';
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
    <div className="absolute bottom-20 right-4">
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
