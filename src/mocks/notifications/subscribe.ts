import { API_BASE_URL } from '@/services/endpoint';
import { http, HttpResponse } from 'msw';

// NOTE: 알림 구독 API는 성공 응답이 공통 형식과 다르므로 createMockHandler로 생성하지 않음
// 성공하는 경우의 응답만 모킹
export const notificationSubscribe = http.get(
  `${API_BASE_URL}/notifications/subscribe`,
  () => {
    return HttpResponse.json('CONNECT', {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
      },
    });
  },
);
