import { createMockHandler } from '@/mocks';
import { District, PROVINCE_CODES, ProvinceCode } from '@/types/location';
import { HttpResponse } from 'msw';
import z from 'zod';

interface DistrictMockItem {
  provinceCode: ProvinceCode;
  districts: District[];
}

const DISTRICT_LIST_MOCK: DistrictMockItem[] = [
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

const ProvinceCodeSchema = z.enum(PROVINCE_CODES);

export const getDistricts = createMockHandler<{ dataList: District[] }>({
  method: 'get',
  endpoint: '/regions/provinces/:provinceCode([A-Z]+)/districts',
  handler: ({ params }) => {
    const { provinceCode } = params;

    const parsed = ProvinceCodeSchema.safeParse(provinceCode);

    if (!parsed.success) {
      return HttpResponse.json(
        {
          status: 'error',
          data: null,
          message: `올바르지 않은 Province Code 입니다: ${provinceCode}`,
        },
        {
          status: 400,
        },
      );
    }

    return HttpResponse.json(
      {
        status: 'success',
        data: {
          dataList: DISTRICT_LIST_MOCK.find(
            (data) => data.provinceCode === provinceCode,
          )?.districts || [{ name: 'mock data 없음' }],
        },
        message:
          'Province Code 매핑된 시/군/구 목록을 성공적으로 조회 했습니다.',
      },
      {
        status: 200,
      },
    );
  },
});
