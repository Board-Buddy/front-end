import { createMockHandler } from '@/mocks';
import { Province } from '@/types/location';
import { HttpResponse } from 'msw';

const PROVINCE_LIST_MOCK: Province[] = [
  {
    code: 'SEOUL',
    name: '서울',
    officialName: '서울특별시',
  },
  {
    code: 'GYEONGGI',
    name: '경기',
    officialName: '경기도',
  },
  {
    code: 'GANGWON',
    name: '강원',
    officialName: '강원특별자치도',
  },
  {
    code: 'BUSAN',
    name: '부산',
    officialName: '부산광역시',
  },
  {
    code: 'DAEGU',
    name: '대구',
    officialName: '대구광역시',
  },
  {
    code: 'INCHEON',
    name: '인천',
    officialName: '인천광역시',
  },
  {
    code: 'GWANGJU',
    name: '광주',
    officialName: '광주광역시',
  },
  {
    code: 'DAEJEON',
    name: '대전',
    officialName: '대전광역시',
  },
  {
    code: 'ULSAN',
    name: '울산',
    officialName: '울산광역시',
  },
  {
    code: 'SEJONG',
    name: '세종',
    officialName: '세종특별자치시',
  },
  {
    code: 'CHUNGBUK',
    name: '충북',
    officialName: '충청북도',
  },
  {
    code: 'CHUNGNAM',
    name: '충남',
    officialName: '충청남도',
  },
  {
    code: 'JEONBUK',
    name: '전북',
    officialName: '전라북도',
  },
  {
    code: 'JEONNAM',
    name: '전남',
    officialName: '전라남도',
  },
  {
    code: 'GYEONGBUK',
    name: '경북',
    officialName: '경상북도',
  },
  {
    code: 'GYEONGNAM',
    name: '경남',
    officialName: '경상남도',
  },
  {
    code: 'JEJU',
    name: '제주',
    officialName: '제주특별자치도',
  },
];

export const getProvinces = createMockHandler<{ dataList: Province[] }>({
  method: 'get',
  endpoint: 'regions/provinces',
  handler: () => {
    return HttpResponse.json(
      {
        status: 'success',
        data: {
          dataList: PROVINCE_LIST_MOCK,
        },
        message: '시/도 목록을 성공적으로 조회 했습니다.',
      },
      {
        status: 200,
      },
    );
  },
});
