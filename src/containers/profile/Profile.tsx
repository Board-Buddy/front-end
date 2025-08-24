'use client';

import ProfileInfo from '@/containers/profile/ProfileInfo';
import BadgeList from '@/containers/profile/BadgeList';
import MyParticipation from '@/containers/my/MyParticipation';
import ReviewList from '@/containers/profile/ReviewList';

import { useGetProfile } from '@/hooks/useProfile';
import { UserInfo } from '@/types/user';
import { cn } from '@/utils/tailwind';
import Loading from '@/components/Loading';
import ErrorFallback from '@/components/ErrorFallback';
import QuitButtons from '../my/QuitButtons';
import { useUserInfo } from '@/hooks/custom/useUserInfo';
import { useSetUserInfo } from '@/hooks/custom/useSetUserInfo';
import { useEffect } from 'react';
import useAppRouter from '@/hooks/custom/useAppRouter';

interface Props {
  nickname?: UserInfo['nickname'];
}

const Profile = ({ nickname }: Props) => {
  const router = useAppRouter();

  const userInfo = useUserInfo();
  const myNickname = userInfo?.nickname || '';

  const setUserInfo = useSetUserInfo();

  const {
    data: profile,
    isPending,
    isError,
    error,
    refetch,
  } = useGetProfile(nickname || myNickname);

  // 내 프로필 사진을 변경했을 경우, 전역 상태에도 반영
  useEffect(() => {
    if (!nickname && profile?.profileImageSignedURL) {
      setUserInfo({ profileImageSignedURL: profile.profileImageSignedURL });
    }
  }, [nickname, profile?.profileImageSignedURL, setUserInfo]);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    if (error.response?.status === 401) {
      router.push({ href: '/login/guide' });
    }

    return (
      <ErrorFallback reset={refetch} errMsg={error.response!.data.message} />
    );
  }

  return (
    <div className={cn('items-center p-8')}>
      <div className="mb-4">
        <ProfileInfo
          nickname={nickname && decodeURIComponent(nickname)}
          description={profile.description}
          rank={profile.rank}
          profileImageSignedURL={profile.profileImageSignedURL}
          buddyScore={profile.buddyScore}
        />
        <MyParticipation joinCount={profile.joinCount} nickname={nickname} />
        <div className="w-full border-t border-dashed" />
        <BadgeList
          badges={profile.badges}
          nickname={nickname && decodeURIComponent(nickname)}
        />
        <div className="w-full border-t border-dashed" />
        <ReviewList
          totalExcellentCount={profile.totalExcellentCount}
          totalGoodCount={profile.totalGoodCount}
          totalBadCount={profile.totalBadCount}
        />
      </div>
      {!nickname && (
        <>
          <div className="w-full border-t border-dashed" />
          <QuitButtons />
        </>
      )}
    </div>
  );
};

export default Profile;
