import api from '@/services';
import { ENDPOINT } from './endpoint';

/** 채팅 목록 조회 API */
export const getChatList = () =>
  api
    .get(ENDPOINT.CHAT_ROOM.LIST())
    .then((response) => response.data.data.chatRoomDetailsList);

/** 채팅 기존 메시지 조회 API */
export const getExistingMessages = (chatRoomId: number | string) =>
  api
    .get(ENDPOINT.CHAT_ROOM.DETAIL.MESSAGES(chatRoomId as number))
    .then((response) => response.data.data.chatMessages);

/** 채팉방과 연결된 모집글 정보 축약 조회 */
export const getArticleSimpleInfo = (
  chatRoomId: number | string,
  articleId: number | string,
) =>
  api
    .get(
      ENDPOINT.CHAT_ROOM.DETAIL.GATHER_ARTICLE_INFO(
        chatRoomId as number,
        articleId as number,
      ),
    )
    .then((response) => response.data.data.gatherArticleSimpleInfo);
