import { useGetProvinceList } from '@/hooks/useLocation';
import { Province } from '@/types/location';
import { Dispatch, SetStateAction } from 'react';
import ProvinceSelectItem from './ProvinceSelectItem';
import { NATION_WIDE } from './LocationFilter';
import { useRouter } from 'next/navigation';
import { useArticleParamsStore } from '@/store/articleParamsStore';

export interface ProvinceSelectorProps {
  selectedProvince: Province;
  onSelectProvince: Dispatch<SetStateAction<Province>>;
}

const ProvinceSelector = ({
  selectedProvince,
  onSelectProvince,
}: ProvinceSelectorProps) => {
  const router = useRouter();

  const setSido = useArticleParamsStore((state) => state.setSido);
  const setSgg = useArticleParamsStore((state) => state.setSgg);
  const setProvince = useArticleParamsStore((state) => state.setProvince);

  const { data } = useGetProvinceList();

  return (
    <div className="flex h-[calc(100vh-theme(spacing.14))] flex-col overflow-y-auto bg-gray-100">
      <ProvinceSelectItem
        key={NATION_WIDE['code']}
        province={NATION_WIDE}
        selectedProvince={selectedProvince}
        onSelectProvince={() => {
          setProvince(NATION_WIDE);
          setSido(null);
          setSgg(null);

          router.back();
        }}
      />
      {data.map((province) => (
        <ProvinceSelectItem
          key={province.code}
          province={province}
          selectedProvince={selectedProvince}
          onSelectProvince={onSelectProvince}
        />
      ))}
    </div>
  );
};

export default ProvinceSelector;
