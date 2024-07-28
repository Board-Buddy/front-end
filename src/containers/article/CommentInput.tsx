'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAddComment } from '@/hooks/useComment';
import { cn } from '@/utils/tailwind';
import { Dispatch, SetStateAction, useState } from 'react';

const CommentInput = ({
  articleId,
  parentComment,
  setParentComment,
}: {
  articleId: number;
  parentComment: {
    parentId: number;
    authorNickname: string;
  } | null;
  setParentComment: Dispatch<
    SetStateAction<{
      parentId: number;
      authorNickname: string;
    } | null>
  >;
}) => {
  const [value, setValue] = useState('');

  const mutation = useAddComment(articleId);

  const handleSubmit = () => {
    mutation.mutate(value);
    setValue('');
  };

  return (
    <>
      {parentComment && (
        <div className="flex items-center mt-4 text-sm">
          <div className=" px-2 py-1 text-slate-600 w-fit rounded-lg">
            {parentComment.authorNickname}님에게 답글을 쓰는 중...
          </div>
          <div
            className="px-2 !py-1 rounded-lg cursor-pointer bg-[#FFF7EA] text-primary"
            onClick={() => setParentComment(null)}
          >
            취소
          </div>
        </div>
      )}
      <div className={cn('flex gap-2', parentComment ? 'mt-2' : 'mt-4')}>
        <Input
          placeholder="댓글 입력"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button className="text-white font-bold" onClick={handleSubmit}>
          등록
        </Button>
      </div>
    </>
  );
};

export default CommentInput;
