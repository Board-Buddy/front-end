import ArticleDetail from '@/containers/article/ArticleDetail';

type Params = Promise<{ articleId: string }>;

const page = async ({ params }: { params: Params }) => {
  const { articleId } = await params;

  return <ArticleDetail id={Number(articleId)} />;
};

export default page;
