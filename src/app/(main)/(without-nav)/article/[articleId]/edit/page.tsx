import ArticleEditForm from '@/containers/article/ArticleEditForm';

const page = async ({ params }: PageProps<'/article/[articleId]/edit'>) => {
  const { articleId } = await params;

  return (
    <div className="p-4">
      <ArticleEditForm articleId={Number(articleId)} />
    </div>
  );
};

export default page;
