import ReviewTargetUserList from '@/containers/reviews/ReviewTargetUserList';

type Params = Promise<{ articleId: string }>;

const page = async ({ params }: { params: Params }) => {
  const { articleId } = await params;

  return (
    <div className="p-4">
      <ReviewTargetUserList articleId={Number(articleId)} />
    </div>
  );
};

export default page;
