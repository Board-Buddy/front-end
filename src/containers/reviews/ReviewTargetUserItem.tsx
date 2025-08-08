'use client';

import CustomAvatar from '@/components/CustomAvatar';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useSendReview } from '@/hooks/useReview';
import { UserInfo } from '@/types/user';
import { Profile } from '@/types/profile';
import { Article } from '@/types/article';
import ReviewModal from './ReviewModal';

interface Props {
  nickname: UserInfo['nickname'];
  profileImage: Profile['profileImageSignedURL'];
  rank: Profile['rank'];
  hasReviewed: boolean;
  articleId: Article['id'];
}

const ReviewTargetUserItem = ({
  nickname,
  profileImage,
  rank,
  hasReviewed,
  articleId,
}: Props) => {
  const [open, setOpen] = useState(false);

  const mutation = useSendReview(Number(articleId), nickname, setOpen);

  const onSubmit = (review: string) => {
    mutation.mutate({ review });
  };

  return (
    <>
      <div className="flex items-center border-b border-slate-100 pb-3">
        <CustomAvatar
          src={profileImage}
          rank={rank}
          nickname={nickname}
          avatarSize="sm"
        />
        <span className="ml-2">{nickname}</span>
        <Button
          className="ml-auto h-8 rounded-lg px-3 py-2 text-white disabled:bg-slate-300 disabled:text-slate-600"
          disabled={hasReviewed}
          onClick={() => setOpen(true)}
        >
          {hasReviewed ? '작성 완료' : '후기 작성'}
        </Button>
      </div>
      <ReviewModal
        open={open}
        setOpen={setOpen}
        nickname={nickname}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default ReviewTargetUserItem;
