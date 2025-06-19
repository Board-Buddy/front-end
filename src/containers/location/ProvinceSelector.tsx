import { useGetProvinceList } from '@/hooks/useLocation';
import { Province } from '@/types/location';
import { Dispatch, SetStateAction } from 'react';
import ProvinceSelectItem from './ProvinceSelectItem';
import { NATION_WIDE } from './LocationFilter';

export interface ProvinceSelectorProps {
  selectedProvince: Province;
  onSelectProvince: Dispatch<SetStateAction<Province>>;
}

const ProvinceSelector = ({
  selectedProvince,
  onSelectProvince,
}: ProvinceSelectorProps) => {
  const { data } = useGetProvinceList();

  return (
    <div className="flex h-[calc(100vh-theme(spacing.14))] flex-col overflow-y-auto bg-gray-100">
      <ProvinceSelectItem
        key={NATION_WIDE['code']}
        province={NATION_WIDE}
        selectedProvince={selectedProvince}
        onSelectProvince={onSelectProvince}
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
