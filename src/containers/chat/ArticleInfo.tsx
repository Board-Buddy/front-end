import { Article } from '@/types/article';
import { ArticleSimpleInfo } from '@/types/chat';
import { formatMeetingTime } from '@/utils/date';
import { UsersRoundIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  articleId: Article['id'];
  articleSimpleInfo: ArticleSimpleInfo;
}

const ArticleInfo = ({ articleId, articleSimpleInfo }: Props) => {
  return (
    <Link href={`/article/${articleId}`}>
      <div className="border-b border-slate-200 px-4 py-3">
        <h1 className="mb-2 text-base">
          <span>&quot;{articleSimpleInfo.title}&quot;</span> 채팅방입니다.
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
                {formatMeetingTime(
                  articleSimpleInfo.startDateTime!,
                  articleSimpleInfo.endDateTime!,
                )}
              </div>
            </div>
            <div className="mt-1 flex items-center">
              <Image
                src="/images/icon/map_icon_gray.png"
                alt="map"
                width={12}
                height={12}
                className="mr-1"
              />
              {articleSimpleInfo.meetingLocation}
              <div className="ml-auto flex items-center gap-1">
                <UsersRoundIcon size={16} className="text-gray-700" />
                {articleSimpleInfo.currentParticipants}/
                {articleSimpleInfo.maxParticipants}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleInfo;
