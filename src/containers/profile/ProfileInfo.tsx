'use client';

import CustomAvatar from '@/components/CustomAvatar';
import { UserInfo } from '@/types/user';
import { cn } from '@/utils/tailwind';
import { useRouter } from 'next/navigation';
import { useExistingProfileInfoContext } from '@/context/ExistingProfileInfoContext';
import { Profile } from '@/types/profile';
import BuddyPoint from './BuddyPoint';
import { useUserInfo } from '@/hooks/custom/useUserInfo';

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

  const userInfo = useUserInfo();
  const myNickname = userInfo?.nickname || '';

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
        <div className="flex items-center gap-2 pt-2">
          <span className="text-xl font-bold text-gray-600">
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
        <p className="mt-1 line-clamp-2 text-sm text-gray-600 ">
          {description}
        </p>
        <BuddyPoint score={buddyScore} />
      </div>
    </div>
  );
};

export default ProfileInfo;
