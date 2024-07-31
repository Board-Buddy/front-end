import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/utils/tailwind';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface Props {
  src: string | null;
  rank: number | null;
  nickname: string;
  avatarSize: string;
}

const CustomAvatar = ({ src, rank, nickname, avatarSize }: Props) => {
  const rankBadge = [
    '/images/badge/first_badge.png',
    '/images/badge/second_badge.png',
    '/images/badge/third_badge.png',
  ];

  const avatarSizeTW: { [key: string]: string } = {
    xs: 'size-8',
    sm: 'size-12',
    md: 'size-16',
    lg: 'size-24',
  };

  const badgeSizeTW: { [key: string]: number } = {
    xs: 14,
    sm: 17,
    md: 22,
    lg: 34,
  };

  return (
    <Link href={`/profile/${nickname}`}>
      <Avatar className={cn(`overflow-visible ${avatarSizeTW[avatarSize]}`)}>
        <AvatarImage src={src || '/images/default_profile.png'} />
        <AvatarFallback>
          <Image src="/images/default_profile.png" alt="avatar_image" fill />
        </AvatarFallback>
        <div className="absolute -bottom-1 right-0">
          {rank ? (
            <Image
              src={rankBadge[rank - 1]}
              width={badgeSizeTW[avatarSize]}
              height={badgeSizeTW[avatarSize]}
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
