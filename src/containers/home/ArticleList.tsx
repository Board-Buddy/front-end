'use client';

import { Fragment, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Article as IArticle, SearchParams } from '@/types/article';
import { UserInfo } from '@/types/user';
import { useRouter } from 'next/navigation';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useGetArticles } from '@/hooks/useGetArticles';
import Selectors from './Selectors';
import Article from './Article';

const ArticleList = () => {
  const router = useRouter();

  const cache = useQueryClient();
  const userInfo = cache.getQueryData(['userInfo']) as UserInfo;
  const locationString = `${userInfo.sido} ${userInfo.sigu} ${userInfo.dong}`;

  const [filter, setFilter] = useState<Omit<SearchParams, 'location'>>({
    status: null,
    sort: null,
  });

  const { data, error, fetchNextPage, hasNextPage, status } = useGetArticles(
    locationString,
    filter.status,
    filter.sort,
  );

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  return status === 'pending' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      <Selectors filter={filter} setFilter={setFilter} />
      {data.pages.map((group, i) => (
        <Fragment key={i}>
          {group.posts.map((article: IArticle) => (
            <Article
              onClick={() => router.push(`/article/${article.id}`)}
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
        </Fragment>
      ))}
      <div ref={setTarget} className="h-0" />
    </>
  );
};

export default ArticleList;
