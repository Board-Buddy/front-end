import { Message } from '@/types/chat';

const EnterExitMessage = ({ message }: { message: Message }) => {
  return (
    <div className="text-gray-500 text-sm text-center">{message.content}</div>
  );
};

export default EnterExitMessage;
