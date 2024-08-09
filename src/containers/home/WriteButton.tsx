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
      className="rounded-full bg-primary border-none shadow-md size-12 sticky bottom-4 left-[386px] p-0"
      onClick={handleClick}
    >
      <PlusIcon color="white" size={24} />
    </Button>
  );
};

export default WriteButton;
