import { useGetDistrictList } from '@/hooks/useLocation';
import { Province } from '@/types/location';
import { useRouter } from 'next/navigation';

interface Props {
  province: Province;
  setSido: (sido: string | null) => void;
  setSgg: (sgg: string | null) => void;
  setProvince: (province: Province | null) => void;
}

const DistrictSelector = ({
  province,
  setSido,
  setSgg,
  setProvince,
}: Props) => {
  const router = useRouter();

  const { data } = useGetDistrictList(province.code);

  return (
    <div className="h-[calc(100vh-theme(spacing.14))] flex-1 overflow-y-auto px-6">
      <div className="flex flex-col divide-y divide-gray-100">
        {data.map((district) => (
          <button
            key={district.name}
            className="py-4 text-start"
            type="button"
            onClick={() => {
              setProvince(province);
              setSido(province.name);
              setSgg(district.name === '전체' ? null : district.name);

              router.back();
            }}
          >
            <p className="text-base text-gray-900">{district.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DistrictSelector;
