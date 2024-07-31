import { getChatRooms } from './rooms';
import { getArticleSimpleInfo } from './rooms/[chatRoomId]/gather-articles/[gatherArticleId]';
import { getExistingMessages } from './rooms/[chatRoomId]/messages';

export const chatHandlers = [
  getExistingMessages,
  getChatRooms,
  getArticleSimpleInfo,
];
