import Profile from '@/containers/profile/Profile';

const Page = ({ params }: { params: { nickname: string } }) => {
  return <Profile nickname={params.nickname} />;
};

export default Page;
