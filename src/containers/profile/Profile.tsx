'use client';

import ProfileInfo from '@/containers/profile/ProfileInfo';
import BuddyPoint from '@/containers/profile/BuddyPoint';
import BadgeList from '@/containers/profile/BadgeList';
import MyParticipation from '@/containers/my/MyParticipation';
import ReviewList from '@/containers/profile/ReviewList';
import LocationSetting from '@/containers/my/LocationSetting';
import { useGetProfile } from '@/hooks/useProfile';
import { useQueryClient } from '@tanstack/react-query';
import { UserInfo } from '@/types/user';
import { cn } from '@/utils/tailwind';
import Loading from '@/components/Loading';
import ErrorFallback from '@/components/ErrorFallback';
import LogoutButton from '../my/LogoutButton';
import WithdrawalButton from '../my/WithdrawalButton';
import MyActivityButton from '../my/MyActivityButton';

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
    <div className={cn('items-center', nickname && 'p-4')}>
      <div className="mb-4">
        <ProfileInfo
          nickname={nickname && decodeURIComponent(nickname)}
          description={profile.description}
          rank={profile.rank}
          profileImageS3SavedURL={profile.profileImageS3SavedURL}
        />
        <BuddyPoint score={profile.buddyScore} />
        <BadgeList
          badges={profile.badges}
          nickname={nickname && decodeURIComponent(nickname)}
        />
        <ReviewList
          totalExcellentCount={profile.totalExcellentCount}
          totalGoodCount={profile.totalGoodCount}
          totalBadCount={profile.totalBadCount}
        />
        {!nickname && (
          <>
            <MyActivityButton />
            <LocationSetting />
          </>
        )}
        <MyParticipation joinCount={profile.joinCount} />
      </div>
      {!nickname && (
        <>
          <LogoutButton />
          <WithdrawalButton />
        </>
      )}
    </div>
  );
};

export default Profile;
