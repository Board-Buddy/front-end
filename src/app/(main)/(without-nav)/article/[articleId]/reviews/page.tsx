import ReviewTargetUserList from '@/containers/reviews/ReviewTargetUserList';

const page = ({ params }: { params: { articleId: string } }) => {
  return (
    <div className="p-4">
      <ReviewTargetUserList articleId={Number(params.articleId)} />
    </div>
  );
};

export default page;
