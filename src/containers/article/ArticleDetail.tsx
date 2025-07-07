'use client';

import { useGetArticle } from '@/hooks/useArticle';
import Loading from '@/components/Loading';
import ErrorFallback from '@/components/ErrorFallback';
import { Article } from '@/types/article';
import ArticleContent from './ArticleContent';
import Profile from './Profile';
import ApplyButton from './ApplyButton';
import CommentList from './CommentList';
import CancelButton from './CancelButton';
import DisabledButton from './DisabledButton';
import CancelButtonForApproved from './CancelButtonForApproved';
import ParticipantsListButton from './ParticipantsListButton';
import ReviewButton from './ReviewButton';
import { useUserInfo } from '@/hooks/custom/useUserInfo';

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
      {isCompleted && article.participationApplicationStatus === 'approved' && (
        <ReviewButton articleId={id} />
      )}
      {!isCompleted && isAuthor && <ParticipantsListButton articleId={id} />}
      {!isCompleted && !isAuthor && (
        <>
          {(article.participationApplicationStatus === 'none' ||
            article.participationApplicationStatus === 'canceled') && (
            <ApplyButton articleId={id} />
          )}
          {article.participationApplicationStatus === 'pending' && (
            <CancelButton articleId={id} />
          )}
          {article.participationApplicationStatus === 'approved' && (
            <CancelButtonForApproved
              articleId={id}
              startDateTime={article.startDateTime}
            />
          )}
          {article.participationApplicationStatus === 'rejected' && (
            <DisabledButton />
          )}
        </>
      )}
      <CommentList articleId={id} />
    </div>
  );
};

export default ArticleDetail;
