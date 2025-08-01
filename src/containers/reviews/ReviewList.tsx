'use client';

import { useGetReviewList } from '@/hooks/useReview';
import Loading from '@/components/Loading';
import ErrorFallback from '@/components/ErrorFallback';
import { Article } from '@/types/article';
import ReviewItem from './ReviewItem';

interface Props {
  articleId: Article['id'];
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
    if (error.response?.status === 401) {
      throw error;
    }

    return (
      <ErrorFallback reset={refetch} errMsg={error.response!.data.message} />
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
          profileImage={review.profileImageSignedURL}
          hasReviewed={review.hasReviewed}
        />
      ))}
    </div>
  );
};

export default ReviewList;
