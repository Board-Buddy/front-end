import { useGetDistrictList } from '@/hooks/useLocation';
import { useArticleParamsStore } from '@/store/articleParamsStore';
import { Province } from '@/types/location';
import { useRouter } from 'next/navigation';

interface Props {
  province: Province;
}

const DistrictSelector = ({ province }: Props) => {
  const router = useRouter();

  const setSido = useArticleParamsStore((state) => state.setSido);
  const setSgg = useArticleParamsStore((state) => state.setSgg);
  const setProvince = useArticleParamsStore((state) => state.setProvince);

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

              router.push('/home');
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
