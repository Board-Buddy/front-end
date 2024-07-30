import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const searchLocation = http.get(
  `${API_BASE_URL}/api/locations/search`,
  ({ request }) => {
    const url = new URL(request.url);
    const keyword = url.searchParams.get('emd');
    const decodedKeyword = decodeURIComponent(keyword!);

    if (decodedKeyword.includes('중앙')) {
      return HttpResponse.json({
        status: 'success',
        data: {
          locations: [
            {
              sido: '부산광역시',
              sgg: '중구',
              emd: '중앙동1가',
              longitude: '129.036113984136',
              latitude: '35.1078157137273',
            },
            {
              sido: '부산광역시',
              sgg: '중구',
              emd: '중앙동2가',
              longitude: '129.035556071885',
              latitude: '35.1021107916232',
            },
          ],
        },
        message: '위치 검색을 성공하였습니다.',
      });
    }

    if (decodedKeyword.length < 2) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '검색어는 두 글자 이상이어야 합니다.',
        },
        { status: 400 },
      );
    }

    return HttpResponse.json(
      {
        status: 'failure',
        data: null,
        message: '검색 결과가 없습니다. 검색어를 다시 확인해주세요.',
      },
      { status: 404 },
    );
  },
);
