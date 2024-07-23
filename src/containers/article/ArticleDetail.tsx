'use client';

import { useGetArticle } from '@/hooks/useArticle';
import ArticleContent from './ArticleContent';
import Profile from './Profile';
import ApplyButton from './ApplyButton';
import CommentList from './CommentList';

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
        startTime={article.startTime}
        endTime={article.endTime}
        createdAt={article.createdAt}
        status={article.status}
      />
      <ApplyButton participationStatus={article.participationStatus!} />
      <CommentList articleId={id} />
    </div>
  );
};

export default ArticleDetail;
