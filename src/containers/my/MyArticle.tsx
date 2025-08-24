'use client';

import { useGetMyArticles } from '@/hooks/useProfile';
import Loading from '@/components/Loading';
import { Article as IArticle } from '@/types/article';
import ErrorFallback from '@/components/ErrorFallback';
import Article from '../home/Article';
import useAppRouter from '@/hooks/custom/useAppRouter';
import FallbackRender from '@/components/FallbackRender';
import EmptyFallback from '@/components/EmptyFallback';

const MyArticle = () => {
  const router = useAppRouter();

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
      router.push({ href: '/login/guide' });
    }

    return (
      <ErrorFallback reset={refetch} errMsg={error.response!.data.message} />
    );
  }

  return (
    <FallbackRender
      render={posts.length === 0}
      component={<EmptyFallback message="작성한 모집글이 없어요🙂" />}
    >
      <div className="flex flex-col gap-y-4 pb-4">
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
      </div>
    </FallbackRender>
  );
};

export default MyArticle;
