import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/utils/tailwind';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface Props {
  src: string;
  rank: number | null;
  nickname: string;
  avatarSize?: number;
  badgeSize?: number;
}

const CustomAvatar = ({
  src,
  rank,
  nickname,
  avatarSize,
  badgeSize,
}: Props) => {
  const rankBadge = [
    '/images/badge/first_badge.png',
    '/images/badge/second_badge.png',
    '/images/badge/third_badge.png',
  ];

  return (
    <Link href={`/profile/${nickname}`}>
      <Avatar className={cn('overflow-visible', `size-${avatarSize}`)}>
        <AvatarImage src={src} />
        <AvatarFallback>CN</AvatarFallback>
        <div className="absolute -bottom-1 right-0">
          {rank ? (
            <Image
              src={rankBadge[rank - 1]}
              width={badgeSize}
              height={badgeSize}
              alt="rank_image"
            />
          ) : (
            <div className="size-5" />
          )}
        </div>
      </Avatar>
    </Link>
  );
};

export default CustomAvatar;
