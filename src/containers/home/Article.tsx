import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Article as ArticleType } from '@/types/article';
import { formatMeetingTime, formatRelativeTime } from '@/utils/date';
import { rankBadgeImageSrc } from '@/utils/rankBadge';

import { cn } from '@/utils/tailwind';
import Image from 'next/image';

const Article = ({
  id,
  title,
  description,
  author,
  location,
  maxParticipants,
  currentParticipants,
  startTime,
  endTime,
  createdAt,
  status,
}: ArticleType) => {
  const badgeImage = rankBadgeImageSrc(author.rank);

  return (
    <Card className="mb-3">
      <CardHeader>
        <CardTitle className="flex text-md font-normal items-center">
          <div
            className={cn(
              'border rounded-md px-2 py-0.5 mr-2',
              status === '모집중' ? 'text-primary' : 'text-gray-600',
            )}
          >
            {status}
          </div>
          {title}
        </CardTitle>
        <CardDescription className="text-gray-500">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col text-sm">
        <div className="text-secondary flex items-center">
          <Image
            src="/images/icon/map_icon.png"
            alt="map"
            width={12}
            height={12}
            className="mr-1"
          />
          {location}
        </div>
        <div className="text-gray-600 flex items-center">
          <Image
            src="/images/icon/participants_icon.png"
            alt="participants"
            width={12}
            height={12}
            className="mr-1"
          />
          {currentParticipants}/{maxParticipants}명 참여
        </div>
        <div className="text-gray-700 flex items-center">
          <Image
            src="/images/icon/clock_icon.png"
            alt="clock"
            width={12}
            height={12}
            className="mr-1"
          />
          {formatMeetingTime(startTime, endTime)}
        </div>
      </CardContent>
      <CardFooter className="flex text-sm">
        <div className="mr-auto text-gray-500">
          {formatRelativeTime(createdAt)}
        </div>
        <div className="flex items-center">
          {badgeImage && (
            <Image
              src={badgeImage}
              alt="rank_badge"
              width={12}
              height={12}
              className="mr-1"
            />
          )}
          {author.nickname}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Article;
