'use client';

import { useGetArticles } from '@/hooks/useArticles';
import { Fragment, useState } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import {
  ArticleRequest,
  ArticleList as IArticleList,
  Article as IArticle,
  SearchParams,
} from '@/types/article';
import { UserInfo } from '@/types/user';
import { useRouter } from 'next/navigation';
import Selectors from './Selectors';
import Article from './Article';
import api from '@/services';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const ArticleList = () => {
  const router = useRouter();

  const cache = useQueryClient();
  const userInfo = cache.getQueryData(['userInfo']) as UserInfo;
  const locationString = `${userInfo.sido} ${userInfo.sigu} ${userInfo.dong}`;

  const [location, setLocation] = useState(locationString);
  const [filter, setFilter] = useState<Omit<SearchParams, 'location'>>({
    status: null,
    sort: null,
  });

  const getArticles = ({ pageParam }: ArticleRequest) =>
    api
      .get('/api/gatherArticles', {
        params: { page: pageParam },
      })
      .then((response) => response.data.data.posts);

  const { data, error, isFetching, fetchNextPage, hasNextPage, status } =
    useInfiniteQuery({
      queryKey: ['articles'],
      queryFn: getArticles,
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.length === 0) {
          return undefined;
        }
        return lastPageParam + 1;
      },
      getPreviousPageParam: (firstPageParam) => {
        if (firstPageParam <= 1) {
          return undefined;
        }
        return firstPageParam - 1;
      },
    });

  if (status === 'success') {
    console.log(data.pages);
  }

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
      <Selectors
        location={location}
        setLocation={setLocation}
        filter={filter}
        setFilter={setFilter}
      />
      {data.pages.map((group, i) => (
        <Fragment key={i}>
          {group.map((article: IArticle) => (
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
