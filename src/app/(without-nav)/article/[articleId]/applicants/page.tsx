import ApplicantList from '@/containers/applicants/ApplicantList';

const page = ({ params }: { params: { articleId: string } }) => {
  return <ApplicantList articleId={params.articleId} />;
};

export default page;
