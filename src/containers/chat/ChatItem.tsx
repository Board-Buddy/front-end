import { ChatRoom } from '@/types/chat';
import { getLastMessageSentTime } from '@/utils/date';
import { MapPinIcon, UserRound } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const ChatItem = ({
  chatRoomId,
  gatherArticleSimpleInfo,
  latestChatMessageInfo,
}: ChatRoom) => {
  return (
    <Link
      href={`/chat/${gatherArticleSimpleInfo.gatherArticleId}/${chatRoomId}`}
    >
      <div className="flex min-h-28 w-full justify-center">
        <div className="bg-white basis-2/3 rounded-xl px-4 py-3">
          <div className="flex items-center">
            <p className="font-extrabold text-primary text-lg tracking-tighter max-w-48 truncate">
              {gatherArticleSimpleInfo.title}
            </p>
            <p className="ml-auto text-xs text-gray-400 tracking-tighter font-semibold">
              {getLastMessageSentTime(latestChatMessageInfo.sentAt)}
            </p>
          </div>
          <p className="text-sm text-gray-500 font-semibold line-clamp-3">
            {latestChatMessageInfo.content}
          </p>
        </div>
        <div className="relative bg-white basis-1/3 rounded-xl">
          <div className="w-full bg-primary rounded-t-xl h-7 place-content-center">
            <p className="text-white text-xs tracking-tighter text-center font-bold">
              게임정보를 확인해요!
            </p>
          </div>
          <div className="flex flex-col p-3 gap-1 tracking-tighter">
            <div className="flex items-start gap-1">
              <div className="bg-primary rounded-full p-1 w-fit">
                <MapPinIcon strokeWidth={2} size={10} color="white" />
              </div>
              <p className="text-xs text-gray-500 font-bold">
                {gatherArticleSimpleInfo.meetingLocation}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <div className="bg-primary rounded-full p-1 w-fit">
                <UserRound strokeWidth={2} size={10} color="white" />
              </div>
              <p className="text-xs text-gray-500 font-bold">
                {gatherArticleSimpleInfo.currentParticipants}명
              </p>
            </div>
          </div>
          <Image
            src="/images/logo/boardbuddy_small_logo_orange.png"
            width={20}
            height={20}
            alt="보드버디 로고"
            className="absolute opacity-30 right-2 bottom-2"
          />
        </div>
      </div>
    </Link>
  );
};

export default ChatItem;
