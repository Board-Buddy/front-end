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
import { useGetMyProfile } from '@/hooks/useProfile';

const Profile = () => {
  const { data: profile, isPending, isError, error } = useGetMyProfile();

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error?.message}</span>;
  }

  return (
    <div className="items-center">
      <div className="mb-4">
        <ProfileInfo description={profile.description} rank={profile.rank} />
        <BuddyPoint score={profile.buddyScore} />
        <BadgeList badges={profile.badges} />
        <ReviewList
          totalExcellentCount={profile.totalExcellentCount}
          totalGoodCount={profile.totalGoodCount}
          totalBadCount={profile.totalBadCount}
        />
        <LocationSetting />
        <MyParticipation joinCount={profile.joinCount} />
        <MyArticle />
      </div>
      <LogoutButton />
      <DeleteAccountButton />
    </div>
  );
};

export default Profile;
