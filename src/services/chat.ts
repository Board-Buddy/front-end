import api from '@/services';
import { ArticleSimpleInfo, ChatRoom, Message } from '@/types/chat';
import { Article } from '@/types/article';
import { InfiniteScrollResponseData, SuccessResponse } from '@/types/api';
import { ENDPOINT } from './endpoint';

/** 채팅 목록 조회 API */
export const getChatList = () =>
  api
    .get<
      SuccessResponse<{ chatRoomDetailsList: ChatRoom[] }>
    >(ENDPOINT.CHAT_ROOM.LIST())
    .then((response) => response.data.data.chatRoomDetailsList);

/** 채팅 기존 메시지 조회 API */
export const getExistingMessages = (
  chatRoomId: ChatRoom['chatRoomId'],
  direction: 'initial' | 'older',
  cursor?: string,
) =>
  api
    .get<SuccessResponse<InfiniteScrollResponseData<Message>>>(
      ENDPOINT.CHAT_ROOM.DETAIL.MESSAGES(chatRoomId),
      {
        params: {
          direction,
          cursor: direction === 'initial' ? undefined : cursor,
        },
      },
    )
    .then((response) => response.data.data);

/** 채팅방과 연결된 모집글 정보 축약 조회 */
export const getArticleSimpleInfo = (
  chatRoomId: ChatRoom['chatRoomId'],
  articleId: Article['id'],
) =>
  api
    .get<
      SuccessResponse<{
        gatherArticleSimpleInfo: Omit<ArticleSimpleInfo, 'id'>;
      }>
    >(ENDPOINT.CHAT_ROOM.DETAIL.GATHER_ARTICLE_INFO(chatRoomId, articleId))
    .then((response) => response.data.data.gatherArticleSimpleInfo);
