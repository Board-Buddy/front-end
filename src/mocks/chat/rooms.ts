import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const getChatRooms = http.get(`${API_BASE_URL}/api/chat/rooms`, () => {
  return HttpResponse.json({
    status: 'success',
    data: {
      chatRooms: [
        {
          chatRoomId: 1,
          gatherArticleId: 30,
          title: '스플렌더 같이 하실 분 ㄱㄱ',
          participants: 8,
          meetingLocation: '레드버튼 신림점',
          lastMessage: {
            content: '확인했습니다. 감사합니다 :)',
            sentAt: '2024-07-19 13:09',
          },
        },
        {
          chatRoomId: 2,
          gatherArticleId: 31,
          title: '스플렌더 같이 하실 분 ㄱㄱ',
          participants: 8,
          meetingLocation: '레드버튼 신림점',
          lastMessage: {
            content: '확인했습니다. 감사합니다 :)',
            sentAt: '2024-07-19 13:09',
          },
        },
      ],
    },
    message: '채팅 메세지들의 정보들을 성공적으로 조회했습니다.',
  });
});
