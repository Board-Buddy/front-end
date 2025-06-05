'use client';

import CustomAvatar from '@/components/CustomAvatar';
import { UserInfo } from '@/types/user';
import { cn } from '@/utils/tailwind';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useExistingProfileInfoContext } from '@/context/ExistingProfileInfoContext';
import { Profile } from '@/types/profile';
import BuddyPoint from './BuddyPoint';

interface Props {
  nickname?: UserInfo['nickname'];
  description: Profile['description'];
  rank: Profile['rank'];
  buddyScore: Profile['buddyScore'];
  profileImageS3SavedURL?: Profile['profileImageS3SavedURL'];
}

const ProfileInfo = ({
  nickname,
  description,
  rank,
  buddyScore,
  profileImageS3SavedURL,
}: Props) => {
  const router = useRouter();

  const cache = useQueryClient();
  const userInfo = cache.getQueryData(['userInfo']) as UserInfo;
  const { nickname: myNickname } = userInfo;

  const { setFormState } = useExistingProfileInfoContext();

  const handleClick = () => {
    setFormState({
      nickname: nickname || myNickname,
      description,
      profileImageFile: profileImageS3SavedURL || null,
    });

    router.push('/my/edit');
  };

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
          <div onClick={handleClick}>
            <div
              className={cn(
                'bg-gray-400 text-white text-xs px-2 py-0.5 rounded-xl text-center cursor-pointer',
                nickname ? 'hidden' : 'visible',
              )}
            >
              <p className="font-bold">프로필 수정</p>
            </div>
          </div>
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
