import Profile from '@/containers/profile/Profile';
import ProfileContainer from '@/containers/profile/ProfileContainer';

const Page = async ({ params }: PageProps<'/profile/[nickname]'>) => {
  const { nickname } = await params;

  return (
    <ProfileContainer>
      <Profile nickname={nickname} />
    </ProfileContainer>
  );
};

export default Page;
