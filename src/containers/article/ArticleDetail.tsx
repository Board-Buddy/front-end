'use client';

import { useGetArticle } from '@/hooks/useArticle';
import ArticleContent from './ArticleContent';
import Profile from './Profile';
import ApplyButton from './ApplyButton';
import CommentList from './CommentList';
import CancelButton from './CancelButton';
import DisabledButton from './DisabledButton';
import CancelButtonForApproved from './CancelButtonForApproved';

const ArticleDetail = ({ id }: { id: number }) => {
  const { data: article, isPending, isError, error } = useGetArticle(id);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <Profile author={article.author} />
      <ArticleContent
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
      <CommentList articleId={id} />
    </div>
  );
};

export default ArticleDetail;
