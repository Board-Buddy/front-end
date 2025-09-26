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
import { cn } from '@/utils/tailwind';
import Image from 'next/image';
import ParticipantsIcon from '@images/icon/participants_icon.png';
import ClockIcon from '@images/icon/clock_icon.png';
import MapIcon from '@images/icon/map_icon.png';
import FirstRankBadge from '@images/badge/first_rank_badge.png';
import SecondRankBadge from '@images/badge/second_rank_badge.png';
import ThirdRankBadge from '@images/badge/third_rank_badge.png';

const rankBadge = [FirstRankBadge, SecondRankBadge, ThirdRankBadge];

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
  const badgeImage = author && author.rank ? rankBadge[author.rank - 1] : null;

  return (
    <Card onClick={onClick} tabIndex={0} aria-label={title} role="listitem">
      <CardHeader>
        <CardTitle className="flex items-center text-base font-semibold text-gray-600">
          <span
            className={cn(
              'border rounded-md px-2 py-0.5 mr-2 flex-none',
              status === 'open'
                ? 'text-primary border-primary'
                : 'text-gray-600 border-gray-500',
            )}
          >
            {ARTICLE_STATUS[status]}
          </span>
          <p className="line-clamp-1">{title}</p>
        </CardTitle>
        <CardDescription className="text-gray-500">
          <p className="line-clamp-1">{description}</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col text-sm">
        <p className="flex items-center text-secondary">
          <Image
            src={MapIcon}
            alt=""
            aria-hidden="true"
            width={12}
            height={12}
            className="mr-1"
          />
          {meetingLocation}
        </p>
        <p
          className="flex items-center text-gray-600"
          aria-label={`현재 ${currentParticipants}명 참여, 최대 ${maxParticipants}명`}
        >
          <Image
            src={ParticipantsIcon}
            alt=""
            aria-hidden="true"
            width={12}
            height={12}
            className="mr-1"
          />
          {currentParticipants}/{maxParticipants}명 참여
        </p>
        <p className="flex items-center text-gray-700">
          <Image
            src={ClockIcon}
            alt=""
            aria-hidden="true"
            width={12}
            height={12}
            className="mr-1"
          />
          {formatMeetingTime(startDateTime, endDateTime)}
        </p>
      </CardContent>
      <CardFooter className="flex text-sm">
        <p className="mr-auto text-gray-500">{formatRelativeTime(createdAt)}</p>
        <p className="flex items-center">
          {badgeImage && (
            <Image
              src={badgeImage}
              alt={`${author?.rank}등 배지`}
              width={30}
              height={30}
            />
          )}
          <span
            className="text-gray-700"
            aria-label={`작성자 ${author?.nickname}`}
          >
            {author?.nickname}
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Article;
