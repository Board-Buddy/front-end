import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const getUserProfile = http.get(
  `${API_BASE_URL}/api/profiles/:nickname`,
  async () => {
    const result = {
      status: 'success',
      data: {
        profile: {
          description: '자기소개',
          rank: 2,
          buddyScore: 68,
          badges: [
            '/images/default_profile.png',
            '/images/default_profile.png',
            '/images/default_profile.png',
          ],
          joinCount: 4,
          totalExcellentCount: 2,
          totalGoodCount: 2,
          totalBadCount: 0,
        },
      },
      message: '반경 설정을 성공하였습니다.',
    };

    return HttpResponse.json(result, { status: 200 });
  },
);