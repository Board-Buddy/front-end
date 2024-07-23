'use client';

import React from 'react';
import CustomAvatar from '@/components/CustomAvatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/tailwind';
import { useQueryClient } from '@tanstack/react-query';
import { UserInfo } from '@/types/user';
import { CornerDownRight, Ellipsis, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { commentTime } from '@/utils/date';
import { useGetComments } from '@/hooks/useComment';

const CommentList = ({ articleId }: { articleId: number }) => {
  const cache = useQueryClient();
  const userInfo = cache.getQueryData(['userInfo']) as UserInfo;
  const { nickname } = userInfo;

  const {
    data: commentList,
    isPending,
    isError,
    error,
  } = useGetComments(articleId);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="p-4">
      <span className="text-gray-700 text-lg font-bold">댓글</span>
      {commentList.map((comment) => (
        <>
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
                  <MessageSquare className="text-gray-400 size-4" />
                </Button>
                <Button
                  className={cn(
                    nickname === comment.author.nickname ? 'visible' : 'hidden',
                    'bg-transparent p-0',
                  )}
                >
                  <Ellipsis className="text-gray-400 size-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm">{comment.content}</p>
            <p className="text-sm mt-2 text-gray-500">
              {commentTime(comment.createdAt)}
            </p>
          </div>
          <div>
            {comment.replies.map((reply) => (
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
                      <MessageSquare className="text-gray-400 size-4" />
                    </Button>
                    <Button
                      className={cn(
                        nickname === reply.author.nickname
                          ? 'visible'
                          : 'hidden',
                        'bg-transparent p-0',
                      )}
                    >
                      <Ellipsis className="text-gray-400 size-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm pl-6">{reply.content}</p>
                <p className="text-sm pl-6 mt-2 text-gray-500">
                  {commentTime(reply.createdAt)}
                </p>
              </div>
            ))}
          </div>
        </>
      ))}
      <div className="mt-4 flex gap-2">
        <Input placeholder="댓글 입력" />
        <Button className="text-white font-bold">등록</Button>
      </div>
    </div>
  );
};

export default CommentList;
