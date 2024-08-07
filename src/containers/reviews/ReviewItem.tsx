import CustomAvatar from '@/components/CustomAvatar';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ReviewModal from './ReviewModal';

interface Props {
  nickname: string;
  profileImage: string;
  rank: number | null;
  isReviewed: boolean;
}

const ReviewItem = ({ nickname, profileImage, rank, isReviewed }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center pb-3 border-b border-slate-100">
        <CustomAvatar
          src={profileImage}
          rank={rank}
          nickname={nickname}
          avatarSize="sm"
        />
        <span className="ml-2">{nickname}</span>
        <Button
          className="text-white rounded-lg px-3 py-2 h-8 ml-auto disabled:bg-slate-300 disabled:text-slate-600"
          disabled={isReviewed}
          onClick={() => setOpen(true)}
        >
          {isReviewed ? '작성 완료' : '후기 작성'}
        </Button>
      </div>
      <ReviewModal open={open} setOpen={setOpen} nickname={nickname} />
    </>
  );
};

export default ReviewItem;
