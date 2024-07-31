import { handleApiError } from '@/utils/handleApiError';
import api from '.';

/** 채팅 기존 메시지 조회 API */
export const getExistingMessages = async (chatRoomId: number | string) => {
  try {
    const response = await api.get(`/api/chat/rooms/${chatRoomId}/messages`);
    return response.data.data.chatMessages;
  } catch (error: unknown) {
    handleApiError(error);
  }
};

/** 채팅 목록 조회 API */
export const getChatList = async () => {
  try {
    const response = await api.get('/api/chat/rooms');
    return response.data.data.chatRoomDetailsList;
  } catch (error: unknown) {
    handleApiError(error);
  }
};

/** 채팉방과 연결된 모집글 정보 축약 조회 */
export const getArticleSimpleInfo = async (
  chatRoomId: number | string,
  articleId: number | string,
) => {
  try {
    const response = await api.get(
      `/api/chat/rooms/${chatRoomId}/gather-articles/${articleId}`,
    );
    return response.data.data.gatherArticleSimpleInfo;
  } catch (error: unknown) {
    handleApiError(error);
  }
};
