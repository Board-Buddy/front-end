import { API_BASE_URL } from '@/services/endpoint';
import { http, HttpResponse } from 'msw';

export const notificationSubscribe = http.get(
  `${API_BASE_URL}/notifications/subscribe`,
  async () => {
    return HttpResponse.json('CONNECT', {
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
      },
    });
  },
);
