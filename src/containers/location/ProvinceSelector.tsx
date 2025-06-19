import { Province } from '@/types/location';
import { cn } from '@/utils/tailwind';
import { Dispatch, SetStateAction } from 'react';

const provinceListMockData = [
  { code: 'ALL', name: '전체' },
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

interface Props {
  selectedProvince: Province | undefined;
  setSelectedProvince: Dispatch<SetStateAction<Province>>;
}

const ProvinceSelector = ({ selectedProvince, setSelectedProvince }: Props) => {
  return (
    <div className="h-[calc(100vh-theme(spacing.14))] overflow-y-auto bg-gray-100">
      {provinceListMockData.map((province) => (
        <div
          key={province.code}
          className={cn(
            'px-9 py-4',
            selectedProvince?.code === province.code &&
              'bg-white border-y-gray-200 ',
          )}
          onClick={() => setSelectedProvince(province)}
        >
          <p
            className={cn(
              'text-base font-semibold text-gray-500',
              selectedProvince?.code === province.code && 'text-gray-950',
            )}
          >
            {province.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProvinceSelector;
