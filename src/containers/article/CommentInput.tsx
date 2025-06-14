'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAddComment, useEditComment } from '@/hooks/useComment';
import { Article } from '@/types/article';
import { Reply } from '@/types/comment';
import { cn } from '@/utils/tailwind';
import { Dispatch, SetStateAction, useState } from 'react';

interface Props {
  articleId: Article['id'];
  parentComment: {
    parentId: Reply['id'];
    authorNickname: Reply['author']['nickname'];
  } | null;
  setParentComment: Dispatch<
    SetStateAction<{
      parentId: Reply['id'];
      authorNickname: Reply['author']['nickname'];
    } | null>
  >;
  editingComment: {
    id: Reply['id'];
    content: Reply['content'];
  } | null;
  setEditingComment: Dispatch<
    SetStateAction<{
      id: Reply['id'];
      content: Reply['content'];
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
        { content: value, parentId: parentComment.parentId },
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
        <div className="mt-4 flex items-center text-sm">
          <div className=" w-fit rounded-lg px-2 py-1 text-slate-600">
            {parentComment.authorNickname}님에게 답글을 쓰는 중...
          </div>
          <div
            className="cursor-pointer rounded-lg bg-[#FFF7EA] !py-1 px-2 text-primary"
            onClick={() => setParentComment(null)}
          >
            취소
          </div>
        </div>
      )}
      {editingComment && (
        <div className="mt-4 flex items-center text-sm">
          <div className="w-fit rounded-lg px-2 py-1 text-slate-600">
            <div className="flex">
              <span className="block max-w-24 truncate pr-1 text-primary">
                {editingComment.content}
              </span>
              수정 중
            </div>
          </div>
          <div
            className="cursor-pointer rounded-lg bg-[#FFF7EA] !py-1 px-2 text-primary"
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
            <Button className="font-bold text-white" onClick={handleEdit}>
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
            <Button className="font-bold text-white" onClick={handleSubmit}>
              등록
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default CommentInput;
