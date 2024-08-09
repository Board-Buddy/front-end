import CustomAvatar from '@/components/CustomAvatar';
import { UserInfo } from '@/types/user';
import { cn } from '@/utils/tailwind';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import BuddyPoint from './BuddyPoint';

interface Props {
  nickname?: string;
  description: string;
  rank: number | null;
  profileImageS3SavedURL?: string | null;
  buddyScore: number;
}

const ProfileInfo = ({
  nickname,
  description,
  rank,
  profileImageS3SavedURL,
  buddyScore,
}: Props) => {
  const cache = useQueryClient();
  const userInfo = cache.getQueryData(['userInfo']) as UserInfo;
  const { nickname: myNickname } = userInfo;

  return (
    <div className="flex gap-4">
      <CustomAvatar
        src={profileImageS3SavedURL || null}
        rank={rank}
        nickname={nickname || myNickname}
        avatarSize="lg"
      />
      <div className="w-full">
        <div className="pt-2 flex items-center gap-2">
          <span className="text-gray-600 font-bold text-xl">
            {nickname || myNickname}
          </span>
          <Link href="/my/edit">
            <div
              className={cn(
                'bg-gray-400 text-white text-xs px-2 py-0.5 rounded-xl text-center cursor-pointer',
                nickname ? 'hidden' : 'visible',
              )}
            >
              <p className="font-bold">프로필 수정</p>
            </div>
          </Link>
        </div>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2 ">
          {description}
        </p>
        <BuddyPoint score={buddyScore} />
      </div>
    </div>
  );
};

export default ProfileInfo;
