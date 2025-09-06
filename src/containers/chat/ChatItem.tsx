import { ChatRoom } from '@/types/chat';
import { getLastMessageSentTime } from '@/utils/date';
import { MapPinIcon, UserRound } from 'lucide-react';
import Image from 'next/image';
import AppLink from '@/components/AppLink';
import SmallLogoOrange from '@images/logo/boardbuddy_small_logo_orange.png';

const ChatItem = ({
  chatRoomId,
  gatherArticleSimpleInfo,
  latestChatMessageInfo,
}: ChatRoom) => {
  return (
    <AppLink
      href={`/chat/${gatherArticleSimpleInfo.gatherArticleId}/${chatRoomId}`}
      headerTitle="채팅"
    >
      <div className="flex min-h-28 w-full justify-center">
        <div className="basis-2/3 rounded-xl bg-white px-4 py-3">
          <div className="flex items-center">
            <p className="max-w-48 truncate text-lg font-bold tracking-tighter text-primary">
              {gatherArticleSimpleInfo.title}
            </p>
            <p className="ml-auto text-xs font-semibold tracking-tighter text-gray-400">
              {getLastMessageSentTime(latestChatMessageInfo.sentAt)}
            </p>
          </div>
          <p className="line-clamp-3 text-sm text-gray-500">
            {latestChatMessageInfo.content}
          </p>
        </div>
        <div className="relative basis-1/3 rounded-xl bg-white">
          <div className="h-7 w-full place-content-center rounded-t-xl bg-primary">
            <p className="text-center text-xs font-semibold tracking-tighter text-white">
              게임정보를 확인해요!
            </p>
          </div>
          <div className="flex flex-col gap-1 p-3 tracking-tighter">
            <div className="flex items-start gap-1">
              <div className="w-fit rounded-full bg-primary p-1">
                <MapPinIcon strokeWidth={2} size={10} color="white" />
              </div>
              <p className="text-xs text-gray-500">
                {gatherArticleSimpleInfo.meetingLocation}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-fit rounded-full bg-primary p-1">
                <UserRound strokeWidth={2} size={10} color="white" />
              </div>
              <p className="text-xs text-gray-500">
                {gatherArticleSimpleInfo.currentParticipants}명
              </p>
            </div>
          </div>
          <Image
            src={SmallLogoOrange}
            width={20}
            height={20}
            alt="보드버디 로고"
            className="absolute bottom-2 right-2 opacity-30"
          />
        </div>
      </div>
    </AppLink>
  );
};

export default ChatItem;
