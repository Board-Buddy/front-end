import { API_BASE_URL } from '@/services/endpoint';
import { http, HttpResponse } from 'msw';

const provinceListMockData = [
  {
    code: 'SEOUL',
    name: '서울',
  },
  {
    code: 'GYEONGGI',
    name: '경기',
  },
  {
    code: 'GANGWON',
    name: '강원',
  },
  {
    code: 'BUSAN',
    name: '부산',
  },
  {
    code: 'DAEGU',
    name: '대구',
  },
  {
    code: 'INCHEON',
    name: '인천',
  },
  {
    code: 'GWANGJU',
    name: '광주',
  },
  {
    code: 'DAEJEON',
    name: '대전',
  },
  {
    code: 'ULSAN',
    name: '울산',
  },
  {
    code: 'SEJONG',
    name: '세종',
  },
  {
    code: 'CHUNGBUK',
    name: '충북',
  },
  {
    code: 'CHUNGNAM',
    name: '충남',
  },
  {
    code: 'JEONBUK',
    name: '전북',
  },
  {
    code: 'JEONNAM',
    name: '전남',
  },
  {
    code: 'GYEONGBUK',
    name: '경북',
  },
  {
    code: 'GYEONGNAM',
    name: '경남',
  },
  {
    code: 'JEJU',
    name: '제주',
  },
];

export const getProvinces = http.get(
  `${API_BASE_URL}/regions/provinces`,
  () => {
    return HttpResponse.json({
      status: 'success',
      data: {
        dataList: provinceListMockData,
      },
      message: '시/도 목록을 성공적으로 조회 했습니다.',
    });
  },
);
