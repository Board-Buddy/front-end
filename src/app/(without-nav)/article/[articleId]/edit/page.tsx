import ArticleEditForm from '@/containers/article/ArticleEditForm';

const page = ({ params }: { params: { articleId: string } }) => {
  return (
    <div className="p-4">
      <ArticleEditForm articleId={Number(params.articleId)} />
    </div>
  );
};

export default page;
