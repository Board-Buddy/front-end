import { MAX_SEARCH_RADIUS } from '@/constants/map';
import { API_BASE_URL } from '@/services/endpoint';
import { http, HttpResponse } from 'msw';

export const boardCafes = http.get(
  `${API_BASE_URL}/board-cafes`,
  ({ request }) => {
    const url = new URL(request.url);
    const radius = url.searchParams.get('radius');

    if (!radius || isNaN(Number(radius))) {
      return HttpResponse.json({
        status: 'failure',
        data: null,
        message: 'radius 파라미터가 필요합니다.',
      });
    }

    if (Number(radius) < 0 || Number(radius) > MAX_SEARCH_RADIUS) {
      return HttpResponse.json({
        status: 'failure',
        data: null,
        message: `반경 값은 0에서 ${MAX_SEARCH_RADIUS} 사이여야 합니다.`,
      });
    }

    return HttpResponse.json(
      {
        status: 'success',
        data: {
          cafes: [
            {
              addressName: '서울 종로구 내수동 73',
              distance: '1867',
              id: '841664157',
              phone: '',
              placeName: '보드게임101 광화문점 24시간 무인카페',
              placeUrl: 'http://place.map.kakao.com/841664157',
              roadAddressName: '서울 종로구 새문안로3길 23',
              sido: '서울특별시',
              sgg: '종로구',
              emd: '내수동',
              x: '126.972438244896',
              y: '37.5725658604431',
            },

            {
              addressName: '서울 종로구 관철동 19-11',
              distance: '2613',
              id: '621777615',
              phone: '070-4247-4562',
              placeName: '보드게임카페 주사위왕국',
              placeUrl: 'http://place.map.kakao.com/621777615',
              roadAddressName: '서울 종로구 우정국로2길 42',
              sido: '서울특별시',
              sgg: '종로구',
              emd: '관철동',
              x: '126.985386588519',
              y: '37.5694300068762',
            },
            {
              addressName: '서울 종로구 관철동 13-1',
              distance: '2677',
              id: '2055835737',
              phone: '02-733-3799',
              placeName: '레드버튼 종로점',
              placeUrl: 'http://place.map.kakao.com/2055835737',
              roadAddressName: '서울 종로구 삼일대로19길 15',
              sido: '서울특별시',
              sgg: '종로구',
              emd: '관철동',
              x: '126.986720016475',
              y: '37.569449085306',
            },
          ],
        },
        message: '보드 게임 카페 조회를 성공하였습니다.',
      },
      { status: 200 },
    );
  },
);

export const boardCafeHandlers = [boardCafes];
