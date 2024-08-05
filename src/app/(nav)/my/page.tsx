import Profile from '@/containers/profile/Profile';
import BuddyPoint from '@/containers/profile/BuddyPoint';
import BadgeList from '@/containers/profile/BadgeList';
import MyParticipation from '@/containers/profile/MyParticipation';
import ReviewList from '@/containers/profile/ReviewList';
import MyArticle from '@/containers/profile/MyArticle';
import LocationSetting from '@/containers/profile/LocationSetting';
import LogoutButton from '@/containers/profile/LogoutButton';
import DeleteAccountButton from '@/containers/profile/DeleteAccountButton';

const Page = () => {
  const profile = {
    description: '자기소개',
    rank: 2,
    buddyScore: 68,
    badges: [
      '/images/default_profile.png',
      '/images/default_profile.png',
      '/images/default_profile.png',
    ],
    joinCount: 4,
    totalExcellentCount: 2,
    totalGoodCount: 2,
    totalBadCount: 0,
  };

  return (
    <>
      <div className="items-center">
        <div className="mb-4">
          <Profile description={profile.description} rank={profile.rank} />
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
    </>
  );
};

export default Page;
