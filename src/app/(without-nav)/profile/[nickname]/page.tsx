'use client';

import BadgeList from '@/containers/profile/BadgeList';
import BuddyPoint from '@/containers/profile/BuddyPoint';
import MyParticipation from '@/containers/profile/MyParticipation';
import ProfileInfo from '@/containers/profile/ProfileInfo';
import ReviewList from '@/containers/profile/ReviewList';

const Page = ({ params }: { params: { nickname: string } }) => {
  return (
    <div className="items-center p-4">
      <div className="pb-4">
        <ProfileInfo
          nickname={decodeURIComponent(params.nickname)}
          description="자기소개"
          rank={null}
        />
        <BuddyPoint score={50} />
        <BadgeList badges={[]} />
        <ReviewList
          totalExcellentCount={0}
          totalGoodCount={2}
          totalBadCount={0}
        />
        <MyParticipation joinCount={2} />
      </div>
    </div>
  );
};

export default Page;
