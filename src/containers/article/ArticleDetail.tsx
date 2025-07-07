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

const ArticleDetail = ({ id }: { id: Article['id'] }) => {
  const userInfo = useUserInfo();
  const nickname = userInfo?.nickname;

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
      throw error;
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
      {userInfo && (
        <ArticleParticipationStatus
          isCompleted={isCompleted}
          isAuthor={isAuthor}
          id={id}
          startDateTime={article.startDateTime}
        />
      )}
      <CommentList articleId={id} />
    </div>
  );
};

export default ArticleDetail;
