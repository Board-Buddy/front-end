import BadgeListDetail from '@/containers/profile/BadgeListDetail';

const page = async ({ params }: PageProps<'/profile/[nickname]/badges'>) => {
  const { nickname } = await params;

  return <BadgeListDetail nickname={nickname} />;
};

export default page;
