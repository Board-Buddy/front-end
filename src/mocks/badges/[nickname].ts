import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const getBadgeList = http.get(
  `${API_BASE_URL}/api/badges/:nickname`,
  async () => {
    const result = {
      status: 'success',
      data: {
        badges: [
          {
            badgeImageS3SavedURL: '',
          },
          {
            badgeImageS3SavedURL: '',
          },
          {
            badgeImageS3SavedURL: '',
          },
          {
            badgeImageS3SavedURL: '',
          },
          {
            badgeImageS3SavedURL: '',
          },
        ],
      },
      message: '뱃지가 조회되었습니다.',
    };

    return HttpResponse.json(result, { status: 200 });
  },
);
