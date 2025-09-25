import CustomAvatar from '@/components/CustomAvatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUserInfo } from '@/hooks/custom/useUserInfo';
import { Comment, Reply } from '@/types/comment';
import { commentTime } from '@/utils/date';
import { cn } from '@/utils/tailwind';
import { CornerDownRight, Ellipsis, MessageSquare } from 'lucide-react';

interface CommentItemProps {
  comment: Comment;
  isReply?: boolean;
  onReplyClick: (
    parentId: Reply['id'],
    authorNickname: Reply['author']['nickname'],
  ) => void;
  onEditClick: (id: Reply['id'], content: Reply['content']) => void;
  onDeleteClick: (id: Reply['id']) => void;
}

const CommentItem = ({
  comment,
  isReply = false,
  onReplyClick,
  onEditClick,
  onDeleteClick,
}: CommentItemProps) => {
  const { userInfo } = useUserInfo();
  const nickname = userInfo?.nickname;

  return (
    <div
      className={cn(
        'my-2 p-4 border-b border-gray-200 last:border-none',
        isReply && 'rounded-lg bg-gray-100',
      )}
    >
      <div className={cn('mb-2 flex items-center gap-2', isReply && 'pl-1')}>
        {isReply && <CornerDownRight size={16} className="text-gray-700" />}
        <CustomAvatar
          src={comment.author.profileImageSignedURL || ''}
          rank={comment.author.rank}
          nickname={comment.author.nickname}
          avatarSize="xs"
        />
        <p className="text-sm">{comment.author.nickname}</p>
        <div className="ml-auto flex gap-2">
          {!isReply && (
            <Button className="bg-transparent p-0">
              <MessageSquare
                className="size-4 text-gray-400"
                onClick={() =>
                  onReplyClick(comment.id, comment.author.nickname)
                }
              />
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                nickname === comment.author.nickname ? 'visible' : 'hidden',
                'bg-transparent p-0',
              )}
            >
              <Ellipsis className="size-4 text-gray-400" />
              <DropdownMenuContent className="-ml-8 -mt-2 w-16 bg-white">
                <DropdownMenuItem
                  className="transition-all hover:bg-slate-50"
                  onClick={() => onEditClick(comment.id, comment.content)}
                >
                  수정
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="transition-all hover:bg-slate-50"
                  onClick={() => onDeleteClick(comment.id)}
                >
                  삭제
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
      </div>
      <p className={cn('text-sm', isReply && 'pl-6')}>{comment.content}</p>
      <p className={cn('mt-2 text-sm text-gray-500', isReply && 'pl-6')}>
        {commentTime(comment.createdAt)}
      </p>
    </div>
  );
};

export default CommentItem;
