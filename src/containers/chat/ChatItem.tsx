import { ChatRoom } from '@/types/chat';
import { getLastMessageSentTime } from '@/utils/date';
import Link from 'next/link';

const ChatItem = ({
  chatRoomId,
  gatherArticleSimpleInfo,
  latestChatMessageInfoDTO,
}: ChatRoom) => {
  return (
    <Link
      href={`/chat/${gatherArticleSimpleInfo.gatherArticleId}/${chatRoomId}`}
    >
      <div className="pb-3 border-b border-slate-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="block font-bold max-w-52 truncate">
              {gatherArticleSimpleInfo.title}
            </span>
            <span className="pl-1 text-slate-500">
              {gatherArticleSimpleInfo.currentParticipants}
            </span>
          </div>
          <div className="text-sm text-slate-500">
            {`${gatherArticleSimpleInfo.meetingLocation} · ${getLastMessageSentTime(latestChatMessageInfoDTO.sentAt)}`}
          </div>
        </div>
        <div>
          <div className="text-md mt-0.5 truncate">
            {latestChatMessageInfoDTO.content}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChatItem;
