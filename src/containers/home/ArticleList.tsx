'use client';

import { useRouter } from 'next/navigation';
import { useIntersectionObserver } from '@/hooks/custom/useIntersectionObserver';
import { useGetArticles } from '@/hooks/useArticle';
import Loading from '@/components/Loading';
import ErrorFallback from '@/components/ErrorFallback';
import Selectors from './Selectors';
import Article from './Article';
import {
  useKeywordSelector,
  useSggSelector,
  useSidoSelector,
  useSortSelector,
  useStatusSelector,
} from '@/store/articleParamsStore';

const ArticleList = () => {
  const router = useRouter();

  const status = useStatusSelector();
  const sort = useSortSelector();
  const sido = useSidoSelector();
  const sgg = useSggSelector();
  const keyword = useKeywordSelector();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isPending,
    isError,
    error,
    refetch,
  } = useGetArticles({ status, sort, sido, sgg, keyword });

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  return (
    <div className="p-8 pt-2">
      <Selectors />
      {isPending && <Loading />}
      {isError && (
        <ErrorFallback reset={refetch} errMsg={error.response!.data.message} />
      )}
      {!isPending && !isError && (
        <>
          {data.pages.map(
            (group) =>
              group.posts && (
                <div
                  key={
                    group.posts.length > 0 ? group.posts[0].id : 'last-group'
                  }
                  className="flex flex-col gap-y-4 pb-4"
                >
                  {group.posts.map((article) => (
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
                </div>
              ),
          )}
          <div className="pt-12 text-center text-sm text-gray-600">
            {data.pages[0].posts === null || data.pages[0].posts.length === 0
              ? '작성된 모집글이 없습니다'
              : '모든 글을 확인하셨습니다'}
          </div>
          <div ref={setTarget} className="h-0" />
        </>
      )}
    </div>
  );
};

export default ArticleList;
