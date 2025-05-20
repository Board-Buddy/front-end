'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAddComment, useEditComment } from '@/hooks/useComment';
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
  editingComment: {
    id: string;
    content: string;
  } | null;
  setEditingComment: Dispatch<
    SetStateAction<{
      id: string;
      content: string;
    } | null>
  >;
}

const CommentInput = ({
  articleId,
  parentComment,
  setParentComment,
  editingComment,
  setEditingComment,
}: Props) => {
  const [value, setValue] = useState('');
  const [editValue, setEditValue] = useState(editingComment?.content || '');

  const addCommentMutation = useAddComment(articleId);
  const editCommentMutation = useEditComment(articleId);

  const handleSubmit = () => {
    if (parentComment) {
      addCommentMutation.mutate(
        { content: value, parentId: Number(parentComment.parentId) },
        {
          onSuccess: () => {
            setParentComment(null);
          },
        },
      );
    } else {
      addCommentMutation.mutate({ content: value });
    }
    setValue('');
  };

  const handleEdit = () => {
    editCommentMutation.mutate(
      { commentId: Number(editingComment!.id), content: editValue! },
      {
        onSuccess: () => {
          setEditingComment(null);
        },
      },
    );
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
      {editingComment && (
        <div className="flex items-center mt-4 text-sm">
          <div className="px-2 py-1 text-slate-600 w-fit rounded-lg">
            <div className="flex">
              <span className="block max-w-24 text-primary truncate pr-1">
                {editingComment.content}
              </span>
              수정 중
            </div>
          </div>
          <div
            className="px-2 !py-1 rounded-lg cursor-pointer bg-[#FFF7EA] text-primary"
            onClick={() => {
              setEditingComment(null);
              setEditValue('');
            }}
          >
            취소
          </div>
        </div>
      )}
      <div
        className={cn(
          'flex gap-2',
          parentComment || editingComment ? 'mt-2' : 'mt-4',
        )}
      >
        {editingComment ? (
          <>
            <Input
              placeholder="댓글 입력"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
            <Button className="text-white font-bold" onClick={handleEdit}>
              수정
            </Button>
          </>
        ) : (
          <>
            <Input
              placeholder="댓글 입력"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button className="text-white font-bold" onClick={handleSubmit}>
              등록
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default CommentInput;
