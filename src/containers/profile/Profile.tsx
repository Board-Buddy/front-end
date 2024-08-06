'use client';

import ProfileInfo from '@/containers/profile/ProfileInfo';
import BuddyPoint from '@/containers/profile/BuddyPoint';
import BadgeList from '@/containers/profile/BadgeList';
import MyParticipation from '@/containers/profile/MyParticipation';
import ReviewList from '@/containers/profile/ReviewList';
import MyArticle from '@/containers/profile/MyArticle';
import LocationSetting from '@/containers/profile/LocationSetting';
import LogoutButton from '@/containers/profile/LogoutButton';
import DeleteAccountButton from '@/containers/profile/DeleteAccountButton';

import { useGetProfile } from '@/hooks/useProfile';
import { LoaderCircleIcon } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { UserInfo } from '@/types/user';
import { cn } from '@/utils/tailwind';

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
  } = useGetProfile(nickname || myNickname);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-100px)]">
        <LoaderCircleIcon className="animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
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
            <MyArticle />
            <LocationSetting />
          </>
        )}
        <MyParticipation joinCount={profile.joinCount} />
      </div>
      {!nickname && (
        <>
          <LogoutButton />
          <DeleteAccountButton />
        </>
      )}
    </div>
  );
};

export default Profile;
