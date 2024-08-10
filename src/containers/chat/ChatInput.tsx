'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/utils/tailwind';
import { ArrowUp } from 'lucide-react';
import { useState } from 'react';

const ChatInput = ({
  sendMessage,
}: {
  sendMessage: (message: string) => void;
}) => {
  const [value, setValue] = useState('');

  const handleClick = () => {
    sendMessage(value);
    setValue('');
  };

  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter') {
      handleClick();
    }
  };

  return (
    <div className="flex items-center gap-2 fixed bottom-0 p-4 max-w-md w-full bg-white">
      <Input
        className="bg-gray-100"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="메시지를 입력하세요."
        onKeyUp={(e) => activeEnter(e)}
      />
      <Button
        className={cn(
          'rounded-full p-2 size-10',
          value ? 'bg-primary' : 'bg-gray-200',
        )}
        disabled={value === ''}
        onClick={handleClick}
      >
        <ArrowUp className={cn(value ? 'text-white' : 'text-gray-700')} />
      </Button>
    </div>
  );
};

export default ChatInput;
