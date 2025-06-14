import { Message } from '@/types/chat';

const EnterExitMessage = ({ message }: { message: Message }) => {
  return (
    <div className="text-center text-sm text-gray-500">{message.content}</div>
  );
};

export default EnterExitMessage;
