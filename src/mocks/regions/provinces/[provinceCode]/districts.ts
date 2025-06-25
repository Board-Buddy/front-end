import { API_BASE_URL } from '@/services/endpoint';
import { http, HttpResponse } from 'msw';

const districtListMockData = [
  {
    provinceCode: 'SEOUL',
    districts: [
      {
        name: '전체',
      },
      {
        name: '강남구',
      },
      {
        name: '강동구',
      },
      {
        name: '강북구',
      },
      {
        name: '강서구',
      },
      {
        name: '관악구',
      },
      {
        name: '광진구',
      },
      {
        name: '구로구',
      },
      {
        name: '금천구',
      },
      {
        name: '노원구',
      },
      {
        name: '도봉구',
      },
      {
        name: '동대문구',
      },
      {
        name: '동작구',
      },
      {
        name: '마포구',
      },
      {
        name: '서대문구',
      },
      {
        name: '서초구',
      },
      {
        name: '성동구',
      },
      {
        name: '성북구',
      },
      {
        name: '송파구',
      },
      {
        name: '양천구',
      },
      {
        name: '영등포구',
      },
      {
        name: '용산구',
      },
      {
        name: '은평구',
      },
      {
        name: '종로구',
      },
      {
        name: '중구',
      },
      {
        name: '중랑구',
      },
    ],
  },
  {
    provinceCode: 'GYEONGGI',
    districts: [
      {
        name: '전체',
      },
      {
        name: '가평군',
      },
      {
        name: '고양시 덕양구',
      },
      {
        name: '고양시 일산동구',
      },
      {
        name: '고양시 일산서구',
      },
      {
        name: '과천시',
      },
      {
        name: '광주시',
      },
      {
        name: '구리시',
      },
      {
        name: '군포시',
      },
      {
        name: '김포시',
      },
      {
        name: '남양주시',
      },
      {
        name: '동두천시',
      },
      {
        name: '부천시',
      },
      {
        name: '성남시 분당구',
      },
      {
        name: '성남시 수정구',
      },
      {
        name: '성남시 중원구',
      },
      {
        name: '수원시 권선구',
      },
      {
        name: '수원시 영통구',
      },
      {
        name: '수원시 장안구',
      },
      {
        name: '수원시 팔달구',
      },
      {
        name: '시흥시',
      },
      {
        name: '안산시 단원구',
      },
      {
        name: '안산시 상록구',
      },
      {
        name: '안성시',
      },
      {
        name: '안양시 동안구',
      },
      {
        name: '안양시 만안구',
      },
    ],
  },
];

export const getDistricts = http.get(
  `${API_BASE_URL}/regions/provinces/:provinceCode([A-Z]+)/districts`,
  ({ params }) => {
    const { provinceCode } = params;

    return HttpResponse.json({
      status: 'success',
      data: {
        dataList: districtListMockData.find(
          (data) => data.provinceCode === provinceCode,
        )?.districts || [{ name: 'mock data 없음' }],
      },
      message: 'Province Code 매핑된 시/군/구 목록을 성공적으로 조회 했습니다.',
    });
  },
);
