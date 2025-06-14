import { getChatRooms } from './rooms';
import { getArticleSimpleInfo } from './rooms/[chatRoomId]/gather-articles/[gatherArticleId]';
import { getExistingMessages } from './messages/[chatRoomId]';

export const chatHandlers = [
  getExistingMessages,
  getChatRooms,
  getArticleSimpleInfo,
];
