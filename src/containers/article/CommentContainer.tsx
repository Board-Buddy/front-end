'use client';

import { useDeleteComment, useGetComments } from '@/hooks/useComment';
import { useState } from 'react';
import CustomAlert from '@/components/CustomAlert';
import Loading from '@/components/Loading';
import ErrorFallback from '@/components/ErrorFallback';
import { Article } from '@/types/article';
import CommentInput from './CommentInput';
import useAppRouter from '@/hooks/custom/useAppRouter';
import { EditingComment, ParentComment } from '@/types/comment';
import CommentList from './CommentList';

interface Props {
  articleId: Article['id'];
}

const CommentContainer = ({ articleId }: Props) => {
  const router = useAppRouter();

  const [openCommentDeleteAlert, setOpenCommentDeleteAlert] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState<number | null>(null);
  const [openReplyDeleteAlert, setOpenReplyDeleteAlert] = useState(false);

  const [parentComment, setParentComment] = useState<ParentComment | null>(
    null,
  );

  const [editingComment, setEditingComment] = useState<EditingComment | null>(
    null,
  );

  const deleteCommentMutation = useDeleteComment(articleId);

  const {
    data: commentList,
    isPending,
    isError,
    error,
    refetch,
  } = useGetComments(articleId);

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
    <>
      <div className="p-4">
        <span className="text-lg font-bold text-gray-700">댓글</span>
        <CommentList
          comments={commentList}
          setParentComment={setParentComment}
          setEditingComment={setEditingComment}
          setOpenCommentDeleteAlert={setOpenCommentDeleteAlert}
          setOpenReplyDeleteAlert={setOpenReplyDeleteAlert}
          setDeleteCommentId={setDeleteCommentId}
        />
        <CommentInput
          articleId={articleId}
          parentComment={parentComment}
          setParentComment={setParentComment}
          editingComment={editingComment}
          setEditingComment={setEditingComment}
        />
      </div>
      <CustomAlert
        open={openCommentDeleteAlert}
        setOpen={setOpenCommentDeleteAlert}
        title="정말 삭제하시겠습니까?"
        description="삭제하시면 복구할 수 없습니다."
        cancelText="아니요"
        confirmText="네"
        onConfirm={() => {
          if (!deleteCommentId) return;
          deleteCommentMutation.mutate(deleteCommentId);
        }}
      />
      <CustomAlert
        open={openReplyDeleteAlert}
        setOpen={setOpenReplyDeleteAlert}
        title="정말 삭제하시겠습니까?"
        description="삭제하시면 복구할 수 없습니다."
        cancelText="아니요"
        confirmText="네"
        onConfirm={() => {
          if (!deleteCommentId) return;
          deleteCommentMutation.mutate(deleteCommentId);
        }}
      />
    </>
  );
};

export default CommentContainer;
