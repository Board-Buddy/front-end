import ApplyButton from './ApplyButton';
import CancelButton from './CancelButton';
import DisabledButton from './DisabledButton';
import CancelButtonForApproved from './CancelButtonForApproved';
import ParticipantsListButton from './ParticipantsListButton';
import ReviewButton from './ReviewButton';
import { Article } from '@/types/article';
import { useGetArticleParticipationStatus } from '@/hooks/useArticle';
import ErrorFallback from '@/components/ErrorFallback';

interface Props extends Pick<Article, 'id' | 'startDateTime'> {
  isCompleted: boolean;
  isAuthor: boolean;
}

const ArticleParticipationStatus = ({
  isCompleted,
  isAuthor,
  id,
  startDateTime,
}: Props) => {
  const { data, isPending, isError, error, refetch } =
    useGetArticleParticipationStatus(id);

  if (isPending) return null;

  if (isError) {
    if (error.response?.status === 401) {
      throw error;
    }

    return (
      <ErrorFallback errMsg={error.response?.data.message} reset={refetch} />
    );
  }

  return (
    <>
      {isCompleted && data.participationApplicationStatus === 'approved' && (
        <ReviewButton articleId={id} />
      )}
      {!isCompleted && isAuthor && <ParticipantsListButton articleId={id} />}
      {!isCompleted && !isAuthor && (
        <>
          {(data.participationApplicationStatus === 'none' ||
            data.participationApplicationStatus === 'canceled') && (
            <ApplyButton articleId={id} />
          )}
          {data.participationApplicationStatus === 'pending' && (
            <CancelButton articleId={id} />
          )}
          {data.participationApplicationStatus === 'approved' && (
            <CancelButtonForApproved
              articleId={id}
              startDateTime={startDateTime}
            />
          )}
          {data.participationApplicationStatus === 'rejected' && (
            <DisabledButton />
          )}
        </>
      )}
    </>
  );
};

export default ArticleParticipationStatus;
