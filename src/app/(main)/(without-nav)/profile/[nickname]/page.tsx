import Profile from '@/containers/profile/Profile';
import ProfileContainer from '@/containers/profile/ProfileContainer';

type Params = Promise<{ nickname: string }>;

const Page = async ({ params }: { params: Params }) => {
  const { nickname } = await params;

  return (
    <ProfileContainer>
      <Profile nickname={nickname} />
    </ProfileContainer>
  );
};

export default Page;
