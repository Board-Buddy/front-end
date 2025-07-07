import Profile from '@/containers/profile/Profile';
import ProfileContainer from '@/containers/profile/ProfileContainer';

export const dynamic = 'force-dynamic';

const page = () => {
  return (
    <ProfileContainer>
      <Profile />
    </ProfileContainer>
  );
};

export default page;
