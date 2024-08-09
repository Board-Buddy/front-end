'use client';

import ProfileInfo from '@/containers/profile/ProfileInfo';
import BadgeList from '@/containers/profile/BadgeList';
import MyParticipation from '@/containers/my/MyParticipation';
import ReviewList from '@/containers/profile/ReviewList';

import { useGetProfile } from '@/hooks/useProfile';
import { useQueryClient } from '@tanstack/react-query';
import { UserInfo } from '@/types/user';
import { cn } from '@/utils/tailwind';
import Loading from '@/components/Loading';
import ErrorFallback from '@/components/ErrorFallback';
import QuitButtons from '../my/QuitButtons';

interface Props {
  nickname?: string;
}

const Profile = ({ nickname }: Props) => {
  const cache = useQueryClient();
  const userInfo = cache.getQueryData(['userInfo']) as UserInfo;
  const { nickname: myNickname } = userInfo;

  const {
    data: profile,
    isPending,
    isError,
    error,
    refetch,
  } = useGetProfile(nickname || myNickname);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return (
      <ErrorFallback errMsg={error.response?.data.message} reset={refetch} />
    );
  }

  return (
    <div className={cn('items-center p-8')}>
      <div className="mb-4">
        <ProfileInfo
          nickname={nickname && decodeURIComponent(nickname)}
          description={profile.description}
          rank={profile.rank}
          profileImageS3SavedURL={profile.profileImageS3SavedURL}
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
