import Profile from '@/containers/profile/Profile';
import BuddyPoint from '@/containers/profile/BuddyPoint';
import BadgeList from '@/containers/profile/BadgeList';
import MyParticipation from '@/containers/profile/MyParticipation';
import ReviewList from '@/containers/profile/ReviewList';
import MyArticle from '@/containers/profile/MyArticle';
import LogoutButton from '@/containers/profile/LogoutButton';
import DeleteAccountButton from '@/containers/profile/DeleteAccountButton';

const page = () => {
  return (
    <>
      <div className="items-center">
        <div className="mb-4">
          <Profile />
          <BuddyPoint />
          <BadgeList />
          <ReviewList />
          <MyParticipation />
          <MyArticle />
        </div>
        <LogoutButton />
        <DeleteAccountButton />
      </div>
    </>
  );
};

export default page;
