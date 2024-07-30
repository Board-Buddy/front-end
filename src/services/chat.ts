import api from '.';

/** 채팅 기존 메시지 조회 API */
export const getExistingMessages = (chatRoomId: number | string) =>
  api
    .get(`/api/chat/rooms/${chatRoomId}/messages`)
    .then((response) => response.data.data.chatMessages);
