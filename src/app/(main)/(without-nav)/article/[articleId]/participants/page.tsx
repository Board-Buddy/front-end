import ParticipantList from '@/containers/participants/ParticipantList';

type Params = Promise<{ articleId: string }>;

const page = async ({ params }: { params: Params }) => {
  const { articleId } = await params;

  return <ParticipantList articleId={Number(articleId)} />;
};

export default page;
