'use client';

import { useRouter } from 'next/navigation';
import { useGetMyArticles } from '@/hooks/useProfile';
import Loading from '@/components/Loading';
import { Article as IArticle } from '@/types/article';
import Article from '../home/Article';

const MyArticle = () => {
  const router = useRouter();

  const { data: posts, isPending, isError, error } = useGetMyArticles();

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
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
