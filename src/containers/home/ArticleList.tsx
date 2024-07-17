'use client';

import { useGetArticles } from '@/hooks/useArticles';
import Article from './Article';

const ArticleList = () => {
  const { isPending, isError, data, error } = useGetArticles();

  if (isPending) return <p>Loading...</p>;

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      {data.map((article) => (
        <Article
          key={article.id}
          id={article.id}
          title={article.title}
          description={article.description}
          author={article.author}
          location={article.location}
          maxParticipants={article.maxParticipants}
          currentParticipants={article.currentParticipants}
          startTime={article.startTime}
          endTime={article.endTime}
          createdAt={article.createdAt}
          status={article.status}
        />
      ))}
    </>
  );
};

export default ArticleList;
