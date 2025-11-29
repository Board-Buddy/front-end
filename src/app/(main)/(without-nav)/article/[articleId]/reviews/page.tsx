import ReviewTargetUserList from '@/containers/reviews/ReviewTargetUserList';

const page = async ({ params }: PageProps<'/article/[articleId]/reviews'>) => {
  const { articleId } = await params;

  return (
    <div className="p-4">
      <ReviewTargetUserList articleId={Number(articleId)} />
    </div>
  );
};

export default page;
