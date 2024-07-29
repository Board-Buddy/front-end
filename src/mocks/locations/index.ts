import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const location = http.post(`${API_BASE_URL}/api/locations`, async () => {
  const result = {
    status: 'success',
    data: {
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
    message: '위치 정보 설정을 성공하였습니다.',
  };

  return HttpResponse.json(result, { status: 200 });
});

export const locationHandlers = [location];
