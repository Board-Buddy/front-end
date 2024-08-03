import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const getNotificationList = http.get(
  `${API_BASE_URL}/api/notifications`,
  async () => {
    return HttpResponse.json(
      {
        status: 'success',
        data: {
          notifications: [
            {
              message: "lee 님이 '퇴근 후 보드게임...'에 참가 신청을 했습니다.",
              createdAt: '2024-08-02 14:54',
            },
            {
              message:
                "lee 님이 '퇴근 후 보드게임...'의 참가 신청을 취소했습니다.",
              createdAt: '2024-08-02 14:54',
            },
            {
              message: "lee 님이 '퇴근 후 보드게임...'에 참가 신청을 했습니다.",
              createdAt: '2024-08-02 14:54',
            },
          ],
        },
        message: '알림이 조회되었습니다.',
      },
      { status: 200 },
    );
  },
);

export const notificationSubscribe = http.get(
  `${API_BASE_URL}/api/subscribe`,
  async () => {
    return HttpResponse.json('CONNECT', {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
      },
    });
  },
);

export const notificationHandlers = [
  getNotificationList,
  notificationSubscribe,
];
