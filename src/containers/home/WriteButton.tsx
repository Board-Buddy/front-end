'use client';

import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const WriteButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/article/write');
  };

  return (
    <Button
      className="sticky bottom-4 left-[386px] size-12 rounded-full border-none bg-primary p-0 shadow-md"
      onClick={handleClick}
    >
      <PlusIcon color="white" size={24} />
    </Button>
  );
};

export default WriteButton;
