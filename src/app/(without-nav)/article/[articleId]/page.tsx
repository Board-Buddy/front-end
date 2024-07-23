import ArticleDetail from '@/containers/article/ArticleDetail';

const page = ({ params }: { params: { articleId: number } }) => {
  return <ArticleDetail id={params.articleId} />;
};

export default page;
