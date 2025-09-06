import Image from 'next/image';
import ReviewItem from './ReviewItem';
import SundyHeartShadow from '@images/sundy/sundy_heart_shadow.png';
import ExcellentReviewIcon from '@images/icon/excellent_review_icon.png';
import GoodReviewIcon from '@images/icon/good_review_icon.png';
import BadReviewIcon from '@images/icon/bad_review_icon.png';

const ReviewList = ({
  totalExcellentCount,
  totalGoodCount,
  totalBadCount,
}: {
  totalExcellentCount: number;
  totalGoodCount: number;
  totalBadCount: number;
}) => {
  return (
    <div className="relative py-6">
      <Image
        src={SundyHeartShadow}
        width={80}
        height={135}
        alt="하트를 들고 있는 썬디"
        className="absolute bottom-4 right-0"
      />
      <div className="flex pb-4 text-xl font-bold text-gray-600">받은후기</div>
      <ReviewItem
        imageSrc={ExcellentReviewIcon}
        altText="excellent review"
        label="정말 최고예요"
        count={totalExcellentCount}
      />
      <ReviewItem
        imageSrc={GoodReviewIcon}
        altText="good review"
        label="너무 좋아요"
        count={totalGoodCount}
      />
      <ReviewItem
        imageSrc={BadReviewIcon}
        altText="bad review"
        label="별로예요"
        count={totalBadCount}
      />
    </div>
  );
};

export default ReviewList;
