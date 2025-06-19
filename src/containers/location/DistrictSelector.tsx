import { useGetDistrictList } from '@/hooks/useLocation';
import { Province } from '@/types/location';

interface Props {
  province: Province;
}

const DistrictSelector = ({ province }: Props) => {
  const { data } = useGetDistrictList(province.code);

  return (
    <div className="h-[calc(100vh-theme(spacing.14))] flex-1 overflow-y-auto px-6">
      <div className="flex flex-col divide-y divide-gray-100">
        {data.map((district) => (
          <button key={district.name} className="py-4 text-start" type="button">
            <p className="text-base text-gray-900">{district.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DistrictSelector;
