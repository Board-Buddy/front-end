import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

const WriteButton = () => {
  return (
    <Button className="rounded-full bg-primary border-none shadow-md size-12 sticky bottom-4 left-[400px] p-0">
      <PlusIcon color="white" size={24} />
    </Button>
  );
};

export default WriteButton;
