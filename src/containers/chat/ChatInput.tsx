import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUp } from 'lucide-react';

const ChatInput = () => {
  return (
    <div className="flex items-center gap-2 fixed bottom-0 p-4 max-w-md w-full bg-white">
      <Input className="bg-gray-100" />
      <Button className="rounded-full p-2 size-9">
        <ArrowUp className="text-white" />
      </Button>
    </div>
  );
};

export default ChatInput;
