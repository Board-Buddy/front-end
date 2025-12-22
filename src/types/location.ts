export const PROVINCE_CODES = [
  'ALL', // 프론트에서만 사용하는 전국 코드
  'SEOUL',
  'GYEONGGI',
  'GANGWON',
  'BUSAN',
  'DAEGU',
  'INCHEON',
  'GWANGJU',
  'DAEJEON',
  'ULSAN',
  'SEJONG',
  'CHUNGBUK',
  'CHUNGNAM',
  'JEONBUK',
  'JEONNAM',
  'GYEONGBUK',
  'GYEONGNAM',
  'JEJU',
] as const;

export type ProvinceCode = (typeof PROVINCE_CODES)[number];
export interface Province {
  code: ProvinceCode;
  name: string;
  officialName: string;
}

export interface District {
  name: string;
}
