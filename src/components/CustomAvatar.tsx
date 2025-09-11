import Image from 'next/image';
import { cn } from '@/utils/tailwind';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import AppLink from './AppLink';
import { useUserInfo } from '@/hooks/custom/useUserInfo';
import DefaultProfile from '@images/default_profile.png';
import FirstRankBadge from '@images/badge/first_rank_badge.png';
import SecondRankBadge from '@images/badge/second_rank_badge.png';
import ThirdRankBadge from '@images/badge/third_rank_badge.png';

const rankBadge = [FirstRankBadge, SecondRankBadge, ThirdRankBadge];

const avatarSizeTW: { [key: string]: string } = {
  xs: 'size-8',
  sm: 'size-[55px]', // 랭킹 2, 3등
  md: 'size-[75px]', // 랭킹 1등
  lg: 'size-[130px]',
};

const badgeSizeTW: { [key: string]: number } = {
  xs: 40,
  sm: 50,
  md: 60,
  lg: 100,
};

interface Props {
  src: string | null;
  rank: number | null;
  nickname: string;
  avatarSize: string;
}

const CustomAvatar = ({ src, rank, nickname, avatarSize }: Props) => {
  const userInfo = useUserInfo();
  const loggedInUser = userInfo.userInfo?.nickname === nickname;

  return (
    <AppLink
      href={loggedInUser ? `/my` : `/profile/${nickname}`}
      screenName={loggedInUser ? 'MyPageScreen' : undefined}
      headerTitle={`${nickname} 님의 프로필`}
    >
      <Avatar
        className={cn(
          `overflow-visible ${avatarSizeTW[avatarSize]} flex flex-col items-center`,
        )}
      >
        <AvatarImage
          src={src || '/images/default_profile.png'}
          className="rounded-full border border-gray-500 object-cover"
        />
        <AvatarFallback>
          <Image src={DefaultProfile} alt="avatar_image" fill />
        </AvatarFallback>
        <div
          className={cn(
            avatarSize === 'xs' && '-translate-y-3',
            avatarSize === 'sm' && '-translate-y-4',
            avatarSize === 'md' && '-translate-y-5',
            avatarSize === 'lg' && '-translate-y-8',
          )}
        >
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
    </AppLink>
  );
};

export default CustomAvatar;
