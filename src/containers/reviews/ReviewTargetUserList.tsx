'use client';

import { useGetReviewTargetUserList } from '@/hooks/useReview';
import Loading from '@/components/Loading';
import ErrorFallback from '@/components/ErrorFallback';
import { Article } from '@/types/article';
import ReviewTargetUserItem from './ReviewTargetUserItem';
import useAppRouter from '@/hooks/custom/useAppRouter';

interface Props {
  articleId: Article['id'];
}

const ReviewTargetUserList = ({ articleId }: Props) => {
  const router = useAppRouter();
  const {
    data: reviewList,
    isPending,
    isError,
    error,
    refetch,
  } = useGetReviewTargetUserList(articleId);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    if (error.response?.status === 401) {
      router.push({ href: '/login/guide' });
    }

    return (
      <ErrorFallback reset={refetch} errMsg={error.response!.data.message} />
    );
  }

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
