import { QueryFallbackBoundary } from '@/components/QueryFallbackBoundary';
import ArticleDetail from '@/containers/article/ArticleDetail';
import CommentContainer from '@/containers/article/CommentContainer';
import { getArticleOptions } from '@/hooks/useArticle';
import { getCommentOptions } from '@/hooks/useComment';
import getQueryClient from '@/utils/getQueryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const page = async ({ params }: PageProps<'/article/[articleId]'>) => {
  const { articleId } = await params;
  const articleNumberId = Number(articleId);

  const queryClient = getQueryClient();

  queryClient.prefetchQuery(getArticleOptions(articleNumberId));
  queryClient.prefetchQuery(getCommentOptions(articleNumberId));

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <QueryFallbackBoundary>
        <ArticleDetail id={articleNumberId} />
      </QueryFallbackBoundary>
      <CommentContainer articleId={articleNumberId} />
    </HydrationBoundary>
  );
};

export default page;
