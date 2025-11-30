import ParticipantList from '@/containers/participants/ParticipantList';

const page = async ({
  params,
}: PageProps<'/article/[articleId]/participants'>) => {
  const { articleId } = await params;

  return <ParticipantList articleId={Number(articleId)} />;
};

export default page;
