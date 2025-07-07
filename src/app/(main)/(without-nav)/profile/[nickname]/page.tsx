import Profile from '@/containers/profile/Profile';
import ProfileContainer from '@/containers/profile/ProfileContainer';

const Page = ({ params }: { params: { nickname: string } }) => {
  return (
    <ProfileContainer>
      <Profile nickname={params.nickname} />{' '}
    </ProfileContainer>
  );
};

export default Page;
