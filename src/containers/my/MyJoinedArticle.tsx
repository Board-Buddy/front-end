'use client';

import { useGetJoinedArticles } from '@/hooks/useProfile';
import Loading from '@/components/Loading';
import { Article as IArticle } from '@/types/article';
import ErrorFallback from '@/components/ErrorFallback';
import Article from '../home/Article';
import useAppRouter from '@/hooks/custom/useAppRouter';

const MyJoinedArticle = () => {
  const router = useAppRouter();

  const {
    data: posts,
    isPending,
    isError,
    error,
    refetch,
  } = useGetJoinedArticles();

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    if (error.response?.status === 401) {
      throw error;
    }

    return (
      <ErrorFallback reset={refetch} errMsg={error.response!.data.message} />
    );
  }
  return (
    <>
      {posts.map((article: IArticle) => (
        <Article
          onClick={() =>
            router.push({
              href: `/article/${article.id}`,
              headerTitle: '모집글 상세',
            })
          }
          key={article.id}
          id={article.id}
          title={article.title}
          description={article.description}
          meetingLocation={article.meetingLocation}
          maxParticipants={article.maxParticipants}
          currentParticipants={article.currentParticipants}
          startDateTime={article.startDateTime}
          endDateTime={article.endDateTime}
          createdAt={article.createdAt}
          status={article.status}
        />
      ))}
    </>
  );
};

export default MyJoinedArticle;
