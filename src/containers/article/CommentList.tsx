'use client';

import CustomAvatar from '@/components/CustomAvatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/tailwind';
import { CornerDownRight, Ellipsis, MessageSquare } from 'lucide-react';
import { commentTime } from '@/utils/date';
import { useDeleteComment, useGetComments } from '@/hooks/useComment';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import CustomAlert from '@/components/CustomAlert';
import Loading from '@/components/Loading';
import ErrorFallback from '@/components/ErrorFallback';
import { Article } from '@/types/article';
import { Reply } from '@/types/comment';
import CommentInput from './CommentInput';
import { useUserInfo } from '@/hooks/custom/useUserInfo';

const CommentList = ({ articleId }: { articleId: Article['id'] }) => {
  const userInfo = useUserInfo();
  const nickname = userInfo?.nickname;

  const [openCommentDeleteAlert, setOpenCommentDeleteAlert] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState<number | null>(null);
  const [openReplyDeleteAlert, setOpenReplyDeleteAlert] = useState(false);

  const [parentComment, setParentComment] = useState<{
    parentId: Reply['id'];
    authorNickname: Reply['author']['nickname'];
  } | null>(null);

  const [editingComment, setEditingComment] = useState<{
    id: Reply['id'];
    content: Reply['content'];
  } | null>(null);

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
      throw error;
    }

    return (
      <ErrorFallback reset={refetch} errMsg={error.response!.data.message} />
    );
  }

  const handleReplyButtonClick = (
    parentId: Reply['id'],
    authorNickname: Reply['author']['nickname'],
  ) => {
    setEditingComment(null);
    setParentComment({
      parentId,
      authorNickname,
    });
  };

  const handleEditButtonClick = (
    id: Reply['id'],
    content: Reply['content'],
  ) => {
    setParentComment(null);
    setEditingComment({ id, content });
  };

  return (
    <>
      <div className="p-4">
        <span className="text-lg font-bold text-gray-700">댓글</span>
        {commentList.map((comment) => (
          <div key={comment.id}>
            <div
              key={comment.id}
              className="my-2 border-b border-gray-200 p-4 last-of-type:border-none"
            >
              <div className="mb-2 flex items-center gap-2">
                <CustomAvatar
                  src={comment.author.profileImageSignedURL || ''}
                  rank={comment.author.rank}
                  nickname={comment.author.nickname}
                  avatarSize="xs"
                />
                <p className="text-sm">{comment.author.nickname}</p>
                <div className="ml-auto flex gap-2">
                  <Button className="bg-transparent p-0">
                    <MessageSquare
                      className="size-4 text-gray-400"
                      onClick={() =>
                        handleReplyButtonClick(
                          comment.id,
                          comment.author.nickname,
                        )
                      }
                    />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className={cn(
                        nickname === comment.author.nickname
                          ? 'visible'
                          : 'hidden',
                        'ml-auto cursor-pointer',
                      )}
                    >
                      <Ellipsis className="size-4 text-gray-400" />
                      <DropdownMenuContent className="-ml-8 -mt-2 w-16 bg-white">
                        <DropdownMenuItem
                          className="transition-all hover:bg-slate-50"
                          onClick={() =>
                            handleEditButtonClick(comment.id, comment.content)
                          }
                        >
                          수정
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="transition-all hover:bg-slate-50"
                          onClick={() => {
                            setOpenCommentDeleteAlert(true);
                            setDeleteCommentId(comment.id);
                          }}
                        >
                          삭제
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenuTrigger>
                  </DropdownMenu>
                </div>
              </div>
              <p className="text-sm">{comment.content}</p>
              <p className="mt-2 text-sm text-gray-500">
                {commentTime(comment.createdAt)}
              </p>
            </div>
            <div>
              {comment.children?.map((reply) => (
                <div key={reply.id} className="my-2 rounded-lg bg-gray-100 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <CornerDownRight size={16} className="text-gray-700" />
                    <CustomAvatar
                      src={reply.author.profileImageSignedURL || ''}
                      rank={reply.author.rank}
                      nickname={reply.author.nickname}
                      avatarSize="xs"
                    />
                    <p className="text-sm">{reply.author.nickname}</p>
                    <div className="ml-auto flex gap-2">
                      <Button className="bg-transparent p-0">
                        <MessageSquare
                          className="size-4 text-gray-400"
                          onClick={() =>
                            handleReplyButtonClick(
                              reply.id,
                              reply.author.nickname,
                            )
                          }
                        />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className={cn(
                            nickname === reply.author.nickname
                              ? 'visible'
                              : 'hidden',
                            'bg-transparent p-0',
                          )}
                        >
                          <Ellipsis className="size-4 text-gray-400" />
                          <DropdownMenuContent className="-ml-8 -mt-2 w-16 bg-white">
                            <DropdownMenuItem
                              className="transition-all hover:bg-slate-50"
                              onClick={() =>
                                handleEditButtonClick(reply.id, reply.content)
                              }
                            >
                              수정
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="transition-all hover:bg-slate-50"
                              onClick={() => {
                                setOpenReplyDeleteAlert(true);
                                setDeleteCommentId(comment.id);
                              }}
                            >
                              삭제
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenuTrigger>
                      </DropdownMenu>
                    </div>
                  </div>
                  <p className="pl-6 text-sm">{reply.content}</p>
                  <p className="mt-2 pl-6 text-sm text-gray-500">
                    {commentTime(reply.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
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

export default CommentList;
