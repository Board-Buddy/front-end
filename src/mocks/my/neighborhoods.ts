import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const getMyNeighborhoods = http.get(
  `${API_BASE_URL}/api/my/neighborhoods`,
  async () => {
    const result = {
      status: 'success',
      data: {
        locations: {
          '2': [
            {
              sido: '서울특별시',
              sgg: '종로구',
              emd: '청운동',
            },
            {
              sido: '서울특별시',
              sgg: '종로구',
              emd: '신교동',
            },
          ],
          '5': [
            {
              sido: '서울특별시',
              sgg: '종로구',
              emd: '청운동',
            },
            {
              sido: '서울특별시',
              sgg: '종로구',
              emd: '신교동',
            },
          ],
          '7': [
            {
              sido: '서울특별시',
              sgg: '종로구',
              emd: '청운동',
            },
            {
              sido: '서울특별시',
              sgg: '종로구',
              emd: '신교동',
            },
          ],
          '10': [
            {
              sido: '서울특별시',
              sgg: '종로구',
              emd: '청운동',
            },
            {
              sido: '서울특별시',
              sgg: '종로구',
              emd: '신교동',
            },
          ],
        },
        longitude: 126.96932389009248,
        latitude: 37.58920545163482,
        radius: 7,
      },
      message: '내 동네 조회를 성공하였습니다.',
    };

    return HttpResponse.json(result, { status: 200 });
  },
);
