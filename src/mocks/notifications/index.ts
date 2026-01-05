import { HttpResponse } from 'msw';
import { notificationSubscribe } from './subscribe';
import { createMockHandler } from '..';
import { Notification } from '@/types/notification';

export const getNotificationList = createMockHandler<{
  notifications: Notification[];
}>({
  method: 'get',
  endpoint: '/notifications',
  handler: () => {
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
              createdAt: '2024-08-02 14:55',
            },
            {
              message: "lee 님이 '퇴근 후 보드게임...'에 참가 신청을 했습니다.",
              createdAt: '2024-08-02 14:56',
            },
          ],
        },
        message: '알림이 조회되었습니다.',
      },
      { status: 200 },
    );
  },
});

export const notificationHandlers = [
  getNotificationList,
  notificationSubscribe,
];
