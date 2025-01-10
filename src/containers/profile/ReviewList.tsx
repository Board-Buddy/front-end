import Image from 'next/image';
import ReviewItem from './ReviewItem';

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
    <div className="py-6 relative">
      <Image
        src="/images/sundy/sundy_heart_shadow.png"
        width={80}
        height={135}
        alt="하트를 들고 있는 썬디"
        className="absolute bottom-4 right-0"
      />
      <div className="flex text-xl text-gray-600 font-bold pb-4">받은후기</div>
      <ReviewItem
        imageSrc="/images/icon/excellent_review_icon.png"
        altText="excellent review"
        label="정말 최고예요"
        count={totalExcellentCount}
      />
      <ReviewItem
        imageSrc="/images/icon/good_review_icon.png"
        altText="good review"
        label="너무 좋아요"
        count={totalGoodCount}
      />
      <ReviewItem
        imageSrc="/images/icon/bad_review_icon.png"
        altText="bad review"
        label="별로예요"
        count={totalBadCount}
      />
    </div>
  );
};

export default ReviewList;
