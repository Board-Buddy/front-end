import BadgeListDetail from '@/containers/profile/BadgeListDetail';

const page = ({ params }: { params: { nickname: string } }) => {
  return <BadgeListDetail nickname={params.nickname} />;
};

export default page;
