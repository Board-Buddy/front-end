import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const boardCafes = http.get(
  `${API_BASE_URL}/api/boardCafes`,
  ({ request }) => {
    const url = new URL(request.url);
    const x = url.searchParams.get('x');
    const y = url.searchParams.get('y');
    const radius = url.searchParams.get('radius');

    if (radius === '12000') {
      return HttpResponse.json(
        {
          status: 'success',
          data: {
            cafes: [
              {
                address_name: '서울 종로구 내수동 73',
                distance: '1867',
                id: '841664157',
                phone: '070-8627-1688',
                place_name: '보드게임101 광화문점 24시간 무인카페',
                place_url: 'http://place.map.kakao.com/841664157',
                road_address_name: '서울 종로구 새문안로3길 23',
                x: '126.972438244896',
                y: '37.5725658604431',
              },

              {
                address_name: '서울 종로구 관철동 19-11',
                distance: '2613',
                id: '621777615',
                phone: '070-4247-4562',
                place_name: '보드게임카페 주사위왕국',
                place_url: 'http://place.map.kakao.com/621777615',
                road_address_name: '서울 종로구 우정국로2길 42',
                x: '126.985386588519',
                y: '37.5694300068762',
              },
              {
                address_name: '서울 종로구 관철동 13-1',
                distance: '2677',
                id: '2055835737',
                phone: '02-733-3799',
                place_name: '레드버튼 종로점',
                place_url: 'http://place.map.kakao.com/2055835737',
                road_address_name: '서울 종로구 삼일대로19길 15',
                x: '126.986720016475',
                y: '37.569449085306',
              },
            ],
          },
          message: '보드 게임 카페 조회를 성공하였습니다.',
        },
        { status: 200 },
      );
    }

    return HttpResponse.json(
      { status: 'error', data: null, message: '올바른 요청이 아닙니다.' },
      { status: 404 },
    );
  },
);

export const boardCafeHandlers = [boardCafes];
