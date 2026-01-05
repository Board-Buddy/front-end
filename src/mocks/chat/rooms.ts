import { HttpResponse } from 'msw';
import { createMockHandler } from '..';
import { ChatRoom } from '@/types/chat';
import { GATHER_ARTICLE_MOCK_DATA } from '../gather-articles';

export const getChatRooms = createMockHandler<{
  chatRoomDetailsList: ChatRoom[];
}>({
  method: 'get',
  endpoint: '/chat/rooms',
  handler: () => {
    // NOTE: 참여 여부와 관련 없이 임시 데이터 사용
    const articleList = GATHER_ARTICLE_MOCK_DATA.slice(0, 4);

    return HttpResponse.json(
      {
        status: 'success',
        data: {
          chatRoomDetailsList: articleList.map((article, index) => ({
            chatRoomId: index,
            gatherArticleSimpleInfo: {
              gatherArticleId: article.id,
              title: article.title,
              currentParticipants: article.currentParticipants,
              meetingLocation: article.meetingLocation,
            },
            latestChatMessageInfo: {
              content: '확인했습니다. 감사합니다 :)',
              sentAt: '2025-07-19 13:09',
            },
          })),
        },
        message: '채팅 메세지들의 정보들을 성공적으로 조회했습니다.',
      },
      { status: 200 },
    );
  },
});
