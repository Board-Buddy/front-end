import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ARTICLE_STATUS } from '@/constants/article';
import { Article as ArticleType } from '@/types/article';
import { formatMeetingTime, formatRelativeTime } from '@/utils/date';
import { rankBadgeImageSrc } from '@/utils/rankBadge';

import { cn } from '@/utils/tailwind';
import Image from 'next/image';

type Props = { onClick: () => void } & ArticleType;

const Article = ({
  onClick,
  title,
  description,
  author,
  meetingLocation,
  maxParticipants,
  currentParticipants,
  startDateTime,
  endDateTime,
  createdAt,
  status,
}: Props) => {
  const badgeImage =
    author && author.rank ? rankBadgeImageSrc(author.rank) : null;

  return (
    <Card onClick={onClick}>
      <CardHeader>
        <CardTitle className="flex items-center text-base font-semibold text-gray-600">
          <div
            className={cn(
              'border rounded-md px-2 py-0.5 mr-2 flex-none',
              status === 'open'
                ? 'text-primary border-primary'
                : 'text-gray-600 border-gray-500',
            )}
          >
            {ARTICLE_STATUS[status]}
          </div>
          <p className="line-clamp-1">{title}</p>
        </CardTitle>
        <CardDescription className="text-gray-500">
          <p className="line-clamp-1">{description}</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col text-sm">
        <div className="flex items-center text-secondary">
          <Image
            src="/images/icon/map_icon.png"
            alt="map"
            width={12}
            height={12}
            className="mr-1"
          />
          {meetingLocation}
        </div>
        <div className="flex items-center text-gray-600">
          <Image
            src="/images/icon/participants_icon.png"
            alt="participants"
            width={12}
            height={12}
            className="mr-1"
          />
          {currentParticipants}/{maxParticipants}명 참여
        </div>
        <div className="flex items-center text-gray-700">
          <Image
            src="/images/icon/clock_icon.png"
            alt="clock"
            width={12}
            height={12}
            className="mr-1"
          />
          {formatMeetingTime(startDateTime, endDateTime)}
        </div>
      </CardContent>
      <CardFooter className="flex text-sm">
        <div className="mr-auto text-gray-500">
          {formatRelativeTime(createdAt)}
        </div>
        <div className="flex items-center">
          {badgeImage && (
            <Image src={badgeImage} alt="rank_badge" width={30} height={30} />
          )}
          <p className="text-gray-700">{author?.nickname}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Article;
