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
import CommentInput from './CommentInput';
import { UserInfo } from '@/types/user';
import { getUserInfo } from '@/utils/userInfoStorage';

const CommentList = ({ articleId }: { articleId: number }) => {
  const userInfo = getUserInfo() as UserInfo;
  const { nickname } = userInfo;

  const [openCommentDeleteAlert, setOpenCommentDeleteAlert] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState('');
  const [openReplyDeleteAlert, setOpenReplyDeleteAlert] = useState(false);

  const [parentComment, setParentComment] = useState<{
    parentId: string;
    authorNickname: string;
  } | null>(null);

  const [editingComment, setEditingComment] = useState<{
    id: string;
    content: string;
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
    return (
      <ErrorFallback errMsg={error.response?.data.message} reset={refetch} />
    );
  }

  const handleReplyButtonClick = (parentId: string, authorNickname: string) => {
    setEditingComment(null);
    setParentComment({
      parentId,
      authorNickname,
    });
  };

  const handleEditButtonClick = (id: string, content: string) => {
    setParentComment(null);
    setEditingComment({ id, content });
  };

  return (
    <>
      <div className="p-4">
        <span className="text-gray-700 text-lg font-bold">댓글</span>
        {commentList.map((comment) => (
          <div key={comment.id}>
            <div
              key={comment.id}
              className="p-4 my-2 last-of-type:border-none border-b-[1px] border-gray-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <CustomAvatar
                  src={comment.author.profileImageS3SavedURL || ''}
                  rank={comment.author.rank}
                  nickname={comment.author.nickname}
                  avatarSize="xs"
                />
                <p className="text-sm">{comment.author.nickname}</p>
                <div className="ml-auto flex gap-2">
                  <Button className="bg-transparent p-0">
                    <MessageSquare
                      className="text-gray-400 size-4"
                      onClick={() =>
                        handleReplyButtonClick(
                          comment.id.toString(),
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
                      <Ellipsis className="text-gray-400 size-4" />
                      <DropdownMenuContent className="bg-white -mt-2 -ml-8 w-16">
                        <DropdownMenuItem
                          className="hover:bg-slate-50 transition-all"
                          onClick={() =>
                            handleEditButtonClick(
                              comment.id.toString(),
                              comment.content,
                            )
                          }
                        >
                          수정
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="hover:bg-slate-50 transition-all"
                          onClick={() => {
                            setOpenCommentDeleteAlert(true);
                            setDeleteCommentId(comment.id.toString());
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
              <p className="text-sm mt-2 text-gray-500">
                {commentTime(comment.createdAt)}
              </p>
            </div>
            <div>
              {comment.children?.map((reply) => (
                <div key={reply.id} className="p-4 my-2 bg-gray-100 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CornerDownRight size={16} className="text-gray-700" />
                    <CustomAvatar
                      src={reply.author.profileImageS3SavedURL || ''}
                      rank={reply.author.rank}
                      nickname={reply.author.nickname}
                      avatarSize="xs"
                    />
                    <p className="text-sm">{reply.author.nickname}</p>
                    <div className="ml-auto flex gap-2">
                      <Button className="bg-transparent p-0">
                        <MessageSquare
                          className="text-gray-400 size-4"
                          onClick={() =>
                            handleReplyButtonClick(
                              reply.id.toString(),
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
                          <Ellipsis className="text-gray-400 size-4" />
                          <DropdownMenuContent className="bg-white -mt-2 -ml-8 w-16">
                            <DropdownMenuItem
                              className="hover:bg-slate-50 transition-all"
                              onClick={() =>
                                handleEditButtonClick(
                                  reply.id.toString(),
                                  reply.content,
                                )
                              }
                            >
                              수정
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="hover:bg-slate-50 transition-all"
                              onClick={() => {
                                setOpenReplyDeleteAlert(true);
                                setDeleteCommentId(comment.id.toString());
                              }}
                            >
                              삭제
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenuTrigger>
                      </DropdownMenu>
                    </div>
                  </div>
                  <p className="text-sm pl-6">{reply.content}</p>
                  <p className="text-sm pl-6 mt-2 text-gray-500">
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
        onConfirm={() => deleteCommentMutation.mutate(deleteCommentId)}
      />
      <CustomAlert
        open={openReplyDeleteAlert}
        setOpen={setOpenReplyDeleteAlert}
        title="정말 삭제하시겠습니까?"
        description="삭제하시면 복구할 수 없습니다."
        cancelText="아니요"
        confirmText="네"
        onConfirm={() => deleteCommentMutation.mutate(deleteCommentId)}
      />
    </>
  );
};

export default CommentList;
