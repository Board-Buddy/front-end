'use client';

import { Fragment, useState } from 'react';
import { Article as IArticle, SearchParams } from '@/types/article';
import { UserInfo } from '@/types/user';
import { useRouter } from 'next/navigation';
import { useIntersectionObserver } from '@/hooks/custom/useIntersectionObserver';
import { useGetArticles } from '@/hooks/useArticle';
import Loading from '@/components/Loading';
import ErrorFallback from '@/components/ErrorFallback';
import { getUserInfo } from '@/utils/userInfoStorage';
import Selectors from './Selectors';
import Article from './Article';

const ArticleList = () => {
  const router = useRouter();

  const userInfo = getUserInfo() as UserInfo;
  const locationString = `${userInfo.sido} ${userInfo.sgg} ${userInfo.emd}`;

  const [filter, setFilter] = useState<Omit<SearchParams, 'location'>>({
    status: null,
    sort: null,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isPending,
    isError,
    error,
    refetch,
  } = useGetArticles(locationString, filter.status, filter.sort);

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  return (
    <div className="p-8 pt-2">
      <Selectors filter={filter} setFilter={setFilter} />
      {isPending && <Loading />}
      {isError && (
        <ErrorFallback reset={refetch} errMsg={error.response!.data.message} />
      )}
      {!isPending && !isError && (
        <>
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
                  meetingLocation={article.meetingLocation}
                  maxParticipants={article.maxParticipants}
                  currentParticipants={article.currentParticipants}
                  startDateTime={article.startDateTime}
                  endDateTime={article.endDateTime}
                  createdAt={article.createdAt}
                  status={article.status}
                />
              ))}
            </Fragment>
          ))}
          <div className="text-center translate-y-5 text-gray-600 text-sm">
            {data.pages[0].posts.length === 0
              ? '작성된 모집글이 없습니다.'
              : '모든 글을 확인하셨습니다'}
          </div>
          <div ref={setTarget} className="h-0" />
        </>
      )}
    </div>
  );
};

export default ArticleList;
