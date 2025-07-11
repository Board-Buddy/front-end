'use client';

import { useRouter } from 'next/navigation';
import { useGetMyArticles } from '@/hooks/useProfile';
import Loading from '@/components/Loading';
import { Article as IArticle } from '@/types/article';
import ErrorFallback from '@/components/ErrorFallback';
import Article from '../home/Article';

const MyArticle = () => {
  const router = useRouter();

  const {
    data: posts,
    isPending,
    isError,
    error,
    refetch,
  } = useGetMyArticles();

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
          onClick={() => router.push(`/article/${article.id}`)}
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

export default MyArticle;
