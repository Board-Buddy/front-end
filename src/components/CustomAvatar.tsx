import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface Props {
  src: string;
  rank: number | null;
  nickname: string;
}

const CustomAvatar = ({ src, rank, nickname }: Props) => {
  const rankBadge = [
    '/images/badge/first_badge.png',
    '/images/badge/second_badge.png',
    '/images/badge/third_badge.png',
  ];

  return (
    <Link href={`/profile/${nickname}`}>
      <Avatar className="overflow-visible">
        <AvatarImage src={src} />
        <AvatarFallback>CN</AvatarFallback>
        <div className="absolute -bottom-1 right-0">
          {rank ? (
            <Image
              src={rankBadge[rank - 1]}
              width={15}
              height={15}
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
