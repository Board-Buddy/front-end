'use client';

import CustomAvatar from '@/components/CustomAvatar';
import { UserInfo } from '@/types/user';
import { cn } from '@/utils/tailwind';
import { useExistingProfileInfoContext } from '@/context/ExistingProfileInfoContext';
import { Profile } from '@/types/profile';
import BuddyPoint from './BuddyPoint';
import { useUserInfo } from '@/hooks/custom/useUserInfo';
import useAppRouter from '@/hooks/custom/useAppRouter';
import { saveStateToApp, STATE_KEYS } from '@/utils/appState';

interface Props {
  nickname?: UserInfo['nickname'];
  description: Profile['description'];
  rank: Profile['rank'];
  buddyScore: Profile['buddyScore'];
  profileImageSignedURL?: Profile['profileImageSignedURL'];
}

const ProfileInfo = ({
  nickname,
  description,
  rank,
  buddyScore,
  profileImageSignedURL,
}: Props) => {
  const router = useAppRouter();

  const userInfo = useUserInfo();
  const myNickname = userInfo?.nickname || '';

  const { setFormState } = useExistingProfileInfoContext();

  const handleClick = () => {
    setFormState({
      nickname: nickname || myNickname,
      description,
      profileImageFile: profileImageSignedURL || null,
    });

    saveStateToApp(STATE_KEYS.PROFILE_INFO, {
      nickname: nickname || myNickname,
      description: description ?? '', // 서버에서 null을 보내는 경우가 있어 기본값 설정
      profileImageFile: profileImageSignedURL || null,
    });

    router.push({ href: '/my/edit', headerTitle: '프로필 수정' });
  };

  return (
    <div className="flex gap-4">
      <CustomAvatar
        src={profileImageSignedURL || null}
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
