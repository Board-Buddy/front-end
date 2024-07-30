import { Message } from '@/types/chat';
import { formatSentAt } from '@/utils/date';

const SentMessage = ({ message }: { message: Message }) => {
  return (
    <div className="flex items-end gap-2">
      <span className="ml-auto text-xs text-gray-600">
        {formatSentAt(message.sentAt!)}
      </span>
      <div className="bg-primary rounded-3xl rounded-tr-none max-w-60 py-2 px-4 text-white text-sm">
        {message.content}
      </div>
    </div>
  );
};

export default SentMessage;
