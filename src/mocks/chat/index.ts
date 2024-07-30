import { getChatRooms } from './rooms';
import { getExistingMessages } from './rooms/[chatRoomId]/messages';

export const chatHandlers = [getExistingMessages, getChatRooms];
