import ReviewList from '@/containers/reviews/ReviewList';

const page = ({ params }: { params: { articleId: string } }) => {
  return (
    <div className="p-4">
      <ReviewList articleId={Number(params.articleId)} />
    </div>
  );
};

export default page;
