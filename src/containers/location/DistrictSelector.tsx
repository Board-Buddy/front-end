import { Province } from '@/types/location';

const districtListMockData = [
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
];

interface Props {
  province: Province | undefined;
}

const DistrictSelector = ({ province }: Props) => {
  return (
    <div className="h-[calc(100vh-theme(spacing.14))] flex-1 overflow-y-auto px-6">
      <div className="divide-y divide-gray-100">
        {districtListMockData.map((district) => (
          <div key={district.name} className="py-4">
            <p className="text-base text-gray-900">{district.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DistrictSelector;
