import useAppRouter from '@/hooks/custom/useAppRouter';
import { useGetDistrictList } from '@/hooks/useLocation';
import { Province } from '@/types/location';

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
  const router = useAppRouter();

  const { data } = useGetDistrictList(province.code);

  return (
    <div className="flex flex-col divide-y divide-gray-100">
      {data.map((district) => (
        <button
          key={district.name}
          className="py-4 text-start"
          type="button"
          onClick={() => {
            setProvince(province);
            setSido(province.officialName);
            setSgg(district.name === '전체' ? null : district.name);

            router.back();
          }}
        >
          <p className="text-base text-gray-900">{district.name}</p>
        </button>
      ))}
    </div>
  );
};

export default DistrictSelector;
