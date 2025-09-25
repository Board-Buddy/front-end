import { Dispatch, SetStateAction } from 'react';
import { Author } from './article';

export interface Reply {
  id: number;
  author: Author;
  content: string;
  createdAt: string;
}

export interface Comment extends Reply {
  children?: Reply[];
}

export interface ParentComment {
  parentId: Reply['id'];
  authorNickname: Reply['author']['nickname'];
}

export interface EditingComment {
  id: Reply['id'];
  content: Reply['content'];
}

export interface CommentProps {
  parentComment: ParentComment | null;
  editingComment: EditingComment | null;
  setParentComment: Dispatch<SetStateAction<ParentComment | null>>;
  setEditingComment: Dispatch<SetStateAction<EditingComment | null>>;
  setOpenCommentDeleteAlert: Dispatch<SetStateAction<boolean>>;
  setOpenReplyDeleteAlert: Dispatch<SetStateAction<boolean>>;
  setDeleteCommentId: Dispatch<SetStateAction<number | null>>;
}
