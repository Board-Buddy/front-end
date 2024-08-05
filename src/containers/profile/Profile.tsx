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
import { useQueryClient } from '@tanstack/react-query';
import { UserInfo } from '@/types/user';

const Profile = () => {
  // const cache = useQueryClient();
  // const userInfo = cache.getQueryData(['userInfo']) as UserInfo;
  // const { nickname } = userInfo;

  const { data: profile } = useGetProfile('nickname');

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
