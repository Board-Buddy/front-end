import Profile from '@/containers/profile/Profile';
import BuddyPoint from '@/containers/profile/BuddyPoint';
import BadgeList from '@/containers/profile/BadgeList';
import MyParticipation from '@/containers/profile/MyParticipation';
import ReviewList from '@/containers/profile/ReviewList';
import MyArticle from '@/containers/profile/MyArticle';

const page = () => {
  return (
    <>
      <div className="items-center">
        <Profile />
        <BuddyPoint />
        <BadgeList />
        <ReviewList />
        <MyParticipation />
        <MyArticle />
      </div>
    </>
  );
};

export default page;
