import ArticleDetail from '@/containers/article/ArticleDetail';

const page = async ({ params }: PageProps<'/article/[articleId]'>) => {
  const { articleId } = await params;

  return <ArticleDetail id={Number(articleId)} />;
};

export default page;
