'use client';

import { useGetArticles } from '@/hooks/useArticles';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { SearchParams } from '@/types/article';
import { UserInfo } from '@/types/user';
import Selectors from './Selectors';
import Article from './Article';

const ArticleList = () => {
  const cache = useQueryClient();
  const userInfo = cache.getQueryData(['userInfo']) as UserInfo;

  const [location, setLocation] = useState(userInfo.dong);
  const [filter, setFilter] = useState<Omit<SearchParams, 'location'>>({
    status: null,
    sort: null,
  });

  const { isPending, isError, data, error } = useGetArticles();

  if (isPending) return <p>Loading...</p>;

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <Selectors
        location={location}
        setLocation={setLocation}
        filter={filter}
        setFilter={setFilter}
      />
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
