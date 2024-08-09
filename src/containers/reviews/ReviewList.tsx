'use client';

import { useGetReviewList } from '@/hooks/useReview';
import Loading from '@/components/Loading';
import ErrorFallback from '@/components/ErrorFallback';
import ReviewItem from './ReviewItem';

interface Props {
  articleId: string;
}

const ReviewList = ({ articleId }: Props) => {
  const {
    data: reviewList,
    isPending,
    isError,
    error,
    refetch,
  } = useGetReviewList(articleId);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return (
      <ErrorFallback errMsg={error.response?.data.message} reset={refetch} />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {reviewList.map((review) => (
        <ReviewItem
          articleId={articleId}
          key={review.nickname}
          nickname={review.nickname}
          rank={review.rank}
          profileImage={review.profileImageS3SavedURL}
          hasReviewed={review.hasReviewed}
        />
      ))}
    </div>
  );
};

export default ReviewList;
