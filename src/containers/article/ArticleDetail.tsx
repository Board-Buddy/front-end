'use client';

import { useGetArticle } from '@/hooks/useArticle';
import Loading from '@/components/Loading';
import ErrorFallback from '@/components/ErrorFallback';
import { Article } from '@/types/article';
import ArticleContent from './ArticleContent';
import Profile from './Profile';
import CommentList from './CommentList';
import { useUserInfo } from '@/hooks/custom/useUserInfo';
import ArticleParticipationStatus from './ArticleParticipationStatus';
import { useLoginPromptModal } from '@/store/modalStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/tailwind';
import useAppRouter from '@/hooks/custom/useAppRouter';

const ArticleDetail = ({ id }: { id: Article['id'] }) => {
  const router = useAppRouter();

  const userInfo = useUserInfo();
  const nickname = userInfo?.nickname;

  const openModal = useLoginPromptModal((state) => state.open);

  const {
    data: article,
    isPending,
    isError,
    error,
    refetch,
  } = useGetArticle(id);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    if (error.response?.status === 401) {
      router.push({ href: '/login/guide' });
    }

    return (
      <ErrorFallback errMsg={error.response?.data.message} reset={refetch} />
    );
  }

  const isAuthor = article.author!.nickname === nickname;
  const isCompleted = article.status === 'completed';

  return (
    <div>
      <Profile author={article.author!} />
      <ArticleContent
        id={id}
        title={article.title}
        description={article.description}
        meetingLocation={article.meetingLocation}
        sido={article.sido}
        sgg={article.sgg}
        emd={article.emd}
        x={article.x}
        y={article.y}
        maxParticipants={article.maxParticipants}
        currentParticipants={article.currentParticipants}
        startDateTime={article.startDateTime}
        endDateTime={article.endDateTime}
        createdAt={article.createdAt}
        status={article.status}
        isAuthor={nickname === article.author!.nickname}
      />
      {userInfo ? (
        <ArticleParticipationStatus
          isCompleted={isCompleted}
          isAuthor={isAuthor}
          id={id}
          startDateTime={article.startDateTime}
        />
      ) : (
        /* 비로그인 사용자를 위한 UI */
        <div className="mb-8 px-4">
          <Button
            className={cn(
              'w-full text-white font-bold text-base h-12 shadow-md',
            )}
            onClick={openModal}
          >
            참가 신청
          </Button>
        </div>
      )}
      <CommentList articleId={id} />
    </div>
  );
};

export default ArticleDetail;
