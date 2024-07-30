import CustomAvatar from '@/components/CustomAvatar';
import { Message } from '@/types/chat';
import { formatSentAt } from '@/utils/date';

const ReceivedMessage = ({ message }: { message: Message }) => {
  return (
    <div className="flex gap-2">
      <CustomAvatar
        src={message.profileImageS3SavedURL!}
        rank={message.rank!}
        nickname={message.nickname!}
        avatarSize="xs"
      />
      <div>
        <span className="text-xs text-gray-600">{message.nickname!}</span>
        <div className="mt-1 bg-gray-100 rounded-3xl rounded-tl-none max-w-60 py-2 px-4 text-sm">
          {message.content}
        </div>
      </div>
      <span className="text-xs text-gray-600 self-end">
        {formatSentAt(message.sentAt!)}
      </span>
    </div>
  );
};

export default ReceivedMessage;
