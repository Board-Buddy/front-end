import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const getChatRooms = http.get(`${API_BASE_URL}/api/chat/rooms`, () => {
  return HttpResponse.json({
    status: 'success',
    data: {
      chatRoomDetailsList: [
        {
          chatRoomId: 1,
          gatherArticleSimpleInfo: {
            gatherArticleId: 30,
            title: '스플렌더 같이 하실 분 ㄱㄱ 긴 버전 어쩌구 저쩌구',
            currentParticipants: 3,
            meetingLocation: '레드버튼 신림점',
          },
          latestChatMessageInfo: {
            content: '확인했습니다. 감사합니다 :)',
            sentAt: '2024-07-19 13:09',
          },
        },
        {
          chatRoomId: 2,
          gatherArticleSimpleInfo: {
            gatherArticleId: 30,
            title: '스플렌더 같이 하실 분 ㄱㄱ',
            currentParticipants: 3,
            meetingLocation: '레드버튼 신림점',
          },
          latestChatMessageInfo: {
            content: '확인했습니다. 감사합니다 :)',
            sentAt: '2024-07-19 13:09',
          },
        },
        {
          chatRoomId: 3,
          gatherArticleSimpleInfo: {
            gatherArticleId: 30,
            title: '스플렌더 같이 하실 분 ㄱㄱ',
            currentParticipants: 3,
            meetingLocation: '성균관대역점 더홀릭',
          },
          latestChatMessageInfo: {
            content: '확인했습니다. 감사합니다 :)',
            sentAt: '2024-07-19 13:09',
          },
        },
      ],
    },
    message: '채팅 메세지들의 정보들을 성공적으로 조회했습니다.',
  });
});
