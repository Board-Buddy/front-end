import ArticleEditForm from '@/containers/article/ArticleEditForm';

const page = ({ params }: { params: { articleId: number } }) => {
  return (
    <div className="p-4">
      <ArticleEditForm articleId={params.articleId} />
    </div>
  );
};

export default page;
