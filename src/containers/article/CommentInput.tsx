'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAddComment } from '@/hooks/useComment';
import { cn } from '@/utils/tailwind';
import { Dispatch, SetStateAction, useState } from 'react';

interface Props {
  articleId: number;
  parentComment: {
    parentId: string;
    authorNickname: string;
  } | null;
  setParentComment: Dispatch<
    SetStateAction<{
      parentId: string;
      authorNickname: string;
    } | null>
  >;
}

const CommentInput = ({
  articleId,
  parentComment,
  setParentComment,
}: Props) => {
  const [value, setValue] = useState('');
  const mutation = useAddComment(articleId);

  const handleSubmit = () => {
    if (parentComment) {
      mutation.mutate(
        { content: value, parentId: parentComment.parentId },
        {
          onSuccess: () => {
            setParentComment(null);
          },
        },
      );
    } else {
      mutation.mutate({ content: value });
    }
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
