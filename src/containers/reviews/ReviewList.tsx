'use client';

import ReviewItem from './ReviewItem';

const ReviewList = () => {
  const reviewList = [
    {
      nickname: '김구구',
      rank: 2,
      profileImageS3SavedURL: '',
      isReviewed: false,
    },
    {
      nickname: '김구구',
      rank: 1,
      profileImageS3SavedURL: '',
      isReviewed: true,
    },
    {
      nickname: '김구구',
      rank: 2,
      profileImageS3SavedURL: '',
      isReviewed: false,
    },
    {
      nickname: '김구구',
      rank: null,
      profileImageS3SavedURL: '',
      isReviewed: false,
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      {reviewList.map((review) => (
        <ReviewItem
          key={review.nickname}
          nickname={review.nickname}
          rank={review.rank}
          profileImage={review.profileImageS3SavedURL}
          isReviewed={review.isReviewed}
        />
      ))}
    </div>
  );
};

export default ReviewList;
