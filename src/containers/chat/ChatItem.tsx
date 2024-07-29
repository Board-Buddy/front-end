import { getLastMessageSentTime } from '@/utils/date';
import Link from 'next/link';

interface Props {
  id: number;
  postId: number;
  title: string;
  participants: number;
  meetingLocation: string;
  lastMessage: {
    content: string;
    sentTime: string;
  };
}

const ChatItem = ({
  id,
  postId,
  title,
  participants,
  meetingLocation,
  lastMessage,
}: Props) => {
  return (
    <Link href={`/chat/${postId}`}>
      <div className="pb-3 border-b border-slate-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="block font-bold max-w-52 truncate">{title}</span>
            <span className="pl-1 text-slate-500">{participants}</span>
          </div>
          <div className="text-sm text-slate-500">
            {meetingLocation} · {getLastMessageSentTime(lastMessage.sentTime)}
          </div>
        </div>
        <div>
          <div className="text-md mt-0.5 truncate">{lastMessage.content}</div>
        </div>
      </div>
    </Link>
  );
};

export default ChatItem;
