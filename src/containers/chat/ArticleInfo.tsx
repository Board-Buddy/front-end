import { formatMeetingTime } from '@/utils/date';
import { UsersRoundIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  articleId: string;
}
const ArticleInfo = ({ articleId }: Props) => {
  const startDateTime = '2024-07-20 11:00';
  const endDateTime = '2024-07-20 12:00';
  const meetingLocation = '레드버튼 신림점';
  const maxParticipants = 4;
  const currentParticipants = 2;

  return (
    <Link href={`/article/${articleId}`}>
      <div className="px-4 py-3 border-b border-slate-200">
        <h1 className="text-md mb-2">
          <span>&quot;퇴근 후 보드게임 ㄱㄱ 하실분&quot;</span> 채팅방입니다.
        </h1>
        <div>
          <div className="text-sm text-gray-700">
            <div>
              <div className="flex items-center">
                <Image
                  src="/images/icon/clock_icon.png"
                  alt="clock"
                  width={12}
                  height={12}
                  className="mr-1"
                />
                {formatMeetingTime(startDateTime, endDateTime)}
              </div>
            </div>
            <div className="flex items-center mt-1">
              <Image
                src="/images/icon/map_icon_gray.png"
                alt="map"
                width={12}
                height={12}
                className="mr-1"
              />
              {meetingLocation}
              <div className="flex ml-auto items-center gap-1">
                <UsersRoundIcon size={16} className="text-gray-700" />
                {currentParticipants}/{maxParticipants}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleInfo;
