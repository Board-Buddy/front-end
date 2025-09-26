import { Comment, CommentProps, Reply } from '@/types/comment';
import CommentItem from './CommentItem';

interface Props
  extends Pick<
    CommentProps,
    | 'setParentComment'
    | 'setEditingComment'
    | 'setOpenCommentDeleteAlert'
    | 'setOpenReplyDeleteAlert'
    | 'setDeleteCommentId'
  > {
  comments: Comment[];
}

const CommentList = ({
  comments,
  setParentComment,
  setEditingComment,
  setOpenCommentDeleteAlert,
  setOpenReplyDeleteAlert,
  setDeleteCommentId,
}: Props) => {
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
    <ul aria-labelledby="comment">
      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentItem
            comment={comment}
            onReplyClick={() =>
              handleReplyButtonClick(comment.id, comment.author.nickname)
            }
            onEditClick={() =>
              handleEditButtonClick(comment.id, comment.content)
            }
            onDeleteClick={() => {
              setOpenCommentDeleteAlert(true);
              setDeleteCommentId(comment.id);
            }}
          />
          <ul>
            {/* 대댓글이 있을 경우에만 대댓글 목록을 렌더링 */}
            {comment.children?.map((reply) => (
              <li key={reply.id} aria-label="대댓글">
                <CommentItem
                  isReply
                  comment={reply}
                  onReplyClick={() =>
                    handleReplyButtonClick(reply.id, reply.author.nickname)
                  }
                  onEditClick={() =>
                    handleEditButtonClick(reply.id, reply.content)
                  }
                  onDeleteClick={() => {
                    setOpenReplyDeleteAlert(true);
                    setDeleteCommentId(reply.id);
                  }}
                />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
