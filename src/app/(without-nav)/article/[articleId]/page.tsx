import ArticleDetail from '@/containers/article/ArticleDetail';

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <ArticleDetail id={params.id} />
    </div>
  );
};

export default page;
