import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const getArticleSimpleInfo = http.get(
  `${API_BASE_URL}/chat/rooms/:chatRoomId([0-9]+)/gather-articles/:gatherArticleId([0-9]+)`,
  () => {
    return HttpResponse.json({
      status: 'success',
      data: {
        gatherArticleSimpleInfo: {
          title: '퇴근 후 보드게임 ㄱㄱ하실분',
          meetingLocation: '레드버튼 건대입구점',
          maxParticipants: 4,
          currentParticipants: 2,
          startDateTime: '2024-07-20 11:00',
          endDateTime: '2024-07-20 13:00',
        },
      },
      message: '모집글 정보를 성공적으로 조회했습니다.',
    });
  },
);
