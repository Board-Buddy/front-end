import api from '.';

/** 채팅 기존 메시지 조회 API */
export const getExistingMessages = (chatRoomId: number | string) =>
  api
    .get(`/api/chat/rooms/${chatRoomId}/messages`)
    .then((response) => response.data.data.chatMessages);

/** 채팅 목록 조회 API */
export const getChatList = () =>
  api
    .get('/api/chat/rooms')
    .then((response) => response.data.data.chatRoomDetailsList);

/** 채팉방과 연결된 모집글 정보 축약 조회 */
export const getArticleSimpleInfo = (
  chatRoomId: number | string,
  articleId: number | string,
) =>
  api
    .get(`/api/chat/rooms/${chatRoomId}/gather-articles/${articleId}`)
    .then((response) => response.data.data.gatherArticleSimpleInfo);
