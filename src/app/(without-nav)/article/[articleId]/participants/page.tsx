import ParticipantList from '@/containers/participants/ParticipantList';

const page = ({ params }: { params: { articleId: string } }) => {
  return <ParticipantList articleId={params.articleId} />;
};

export default page;
