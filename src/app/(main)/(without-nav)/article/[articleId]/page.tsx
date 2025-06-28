import ArticleDetail from '@/containers/article/ArticleDetail';

const page = ({ params }: { params: { articleId: string } }) => {
  return <ArticleDetail id={Number(params.articleId)} />;
};

export default page;
