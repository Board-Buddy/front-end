import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const notificationSubscribe = http.get(
  `${API_BASE_URL}/api/notifications/subscribe`,
  async () => {
    return HttpResponse.json('CONNECT', {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
      },
    });
  },
);
