import BadgeListDetail from '@/containers/profile/BadgeListDetail';

type Params = Promise<{ nickname: string }>;

const page = async ({ params }: { params: Params }) => {
  const { nickname } = await params;

  return <BadgeListDetail nickname={nickname} />;
};

export default page;
