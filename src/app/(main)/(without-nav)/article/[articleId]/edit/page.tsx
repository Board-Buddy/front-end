import ArticleEditForm from '@/containers/article/ArticleEditForm';

type Params = Promise<{ articleId: string }>;

const page = async ({ params }: { params: Params }) => {
  const { articleId } = await params;

  return (
    <div className="p-4">
      <ArticleEditForm articleId={Number(articleId)} />
    </div>
  );
};

export default page;
