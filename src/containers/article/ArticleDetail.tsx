'use client';

import { useGetArticle } from '@/hooks/useArticle';
import { useQueryClient } from '@tanstack/react-query';
import { UserInfo } from '@/types/user';
import ArticleContent from './ArticleContent';
import Profile from './Profile';
import ApplyButton from './ApplyButton';
import CommentList from './CommentList';
import CancelButton from './CancelButton';
import DisabledButton from './DisabledButton';
import CancelButtonForApproved from './CancelButtonForApproved';
import ApplicantsListButton from './ApplicantsListButton';

const ArticleDetail = ({ id }: { id: number }) => {
  const cache = useQueryClient();
  const userInfo = cache.getQueryData(['userInfo']) as UserInfo;
  const { nickname } = userInfo;

  const { data: article, isPending, isError, error } = useGetArticle(id);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  const isAuthor = article.author.nickname === nickname;

  return (
    <div>
      <Profile author={article.author} />
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
        isAuthor={nickname === article.author.nickname}
      />
      {isAuthor && <ApplicantsListButton articleId={id} />}
      {!isAuthor && (
        <>
          {(article.participationApplicationStatus === 'none' ||
            article.participationApplicationStatus === 'canceled') && (
            <ApplyButton articleId={id} />
          )}
          {article.participationApplicationStatus === 'pending' && (
            <CancelButton articleId={id} />
          )}
          {article.participationApplicationStatus === 'approved' && (
            <CancelButtonForApproved articleId={id} />
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
