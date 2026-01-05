'use client';

import { useGetReviewTargetUserList } from '@/hooks/useReview';
import { Article } from '@/types/article';
import ReviewTargetUserItem from './ReviewTargetUserItem';

interface Props {
  articleId: Article['id'];
}

const ReviewTargetUserList = ({ articleId }: Props) => {
  const { data: reviewList } = useGetReviewTargetUserList(articleId);

  return (
    <div className="flex flex-col gap-3">
      {reviewList.map((review) => (
        <ReviewTargetUserItem
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

export default ReviewTargetUserList;
