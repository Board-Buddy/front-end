import { Message } from '@/types/chat';
import { formatSentAt } from '@/utils/date';

const SentMessage = ({ message }: { message: Message }) => {
  return (
    <div className="flex items-end gap-2">
      <span className="ml-auto text-xs text-gray-600">
        {formatSentAt(message.sentAt!)}
      </span>
      <div className="max-w-60 rounded-3xl rounded-tr-none bg-primary px-4 py-2 text-sm text-white">
        {message.content}
      </div>
    </div>
  );
};

export default SentMessage;
