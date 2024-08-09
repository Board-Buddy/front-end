import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const getUserProfile = http.get(
  `${API_BASE_URL}/api/profiles/:nickname`,
  async () => {
    const result = {
      status: 'success',
      data: {
        profile: {
          profileImageS3SavedURL: null,
          description: '',
          rank: 2,
          buddyScore: 68,
          badges: [
            {
              badgeImageS3SavedURL: null,
              badgeYearMonth: '2024.09',
            },
            {
              badgeImageS3SavedURL: null,
              badgeYearMonth: '2024.08',
            },
            {
              badgeImageS3SavedURL: null,
              badgeYearMonth: '2024.07',
            },
          ],
          joinCount: 4,
          totalExcellentCount: 2,
          totalGoodCount: 2,
          totalBadCount: 0,
        },
      },
      message: '프로필이 조회되었습니다.',
    };

    return HttpResponse.json(result, { status: 200 });
  },
);
