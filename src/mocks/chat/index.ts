import { getChatRooms } from './rooms';
import { getArticlePreview } from './rooms/[chatRoomId]/gather-articles/[gatherArticleId]';
import { getExistingMessages } from './rooms/[chatRoomId]/messages';

export const chatHandlers = [
  getExistingMessages,
  getChatRooms,
  getArticlePreview,
];
