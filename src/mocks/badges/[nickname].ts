import { API_BASE_URL } from '@/services/endpoint';
import { http, HttpResponse } from 'msw';

export const getBadgeList = http.get(
  `${API_BASE_URL}/badges/:nickname`,
  async () => {
    const result = {
      status: 'success',
      data: {
        badges: [
          {
            badgeImageSignedURL: null,
            badgeYearMonth: '2024.09',
          },
          {
            badgeImageSignedURL: null,
            badgeYearMonth: '2024.08',
          },
          {
            badgeImageSignedURL: null,
            badgeYearMonth: '2024.07',
          },
        ],
      },
      message: '뱃지가 조회되었습니다.',
    };

    return HttpResponse.json(result, { status: 200 });
  },
);
