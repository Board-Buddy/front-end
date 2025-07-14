import { useGetProvinceList } from '@/hooks/useLocation';
import { Province } from '@/types/location';
import { Dispatch, SetStateAction } from 'react';
import ProvinceSelectItem from './ProvinceSelectItem';
import { NATION_WIDE } from './LocationFilter';
import useAppRouter from '@/hooks/custom/useAppRouter';
import { cn } from '@/utils/tailwind';
import useIsWebView from '@/hooks/custom/useIsWebView';

export interface ProvinceSelectorProps {
  selectedProvince: Province;
  onSelectProvince: Dispatch<SetStateAction<Province>>;
  setSido: (sido: string | null) => void;
  setSgg: (sgg: string | null) => void;
  setProvince: (province: Province | null) => void;
}

const ProvinceSelector = ({
  selectedProvince,
  onSelectProvince,
  setSido,
  setSgg,
  setProvince,
}: ProvinceSelectorProps) => {
  const router = useAppRouter();
  const isWebView = useIsWebView();

  const { data } = useGetProvinceList();

  return (
    <div
      className={cn(
        'flex flex-col overflow-y-auto border-r border-gray-100',
        isWebView ? 'h-dvh' : 'h-[calc(100vh-theme(spacing.14))]',
      )}
    >
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
