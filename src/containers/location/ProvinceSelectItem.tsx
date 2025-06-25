import { Province } from '@/types/location';
import { cn } from '@/utils/tailwind';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  province: Province;
  selectedProvince: Province;
  onSelectProvince: Dispatch<SetStateAction<Province>>;
}

const ProvinceSelectItem = ({
  province,
  selectedProvince,
  onSelectProvince,
}: Props) => {
  return (
    <button
      type="button"
      className={cn(
        'px-9 py-4 text-start border-b border-gray-100 transition-colors hover:bg-orange-50',
        selectedProvince?.code === province.code &&
          'bg-primary border-y-gray-200 hover:bg-primary',
      )}
      onClick={() => onSelectProvince(province)}
    >
      <p
        className={cn(
          'text-base font-semibold text-gray-500',
          selectedProvince?.code === province.code && 'text-white',
        )}
      >
        {province.name}
      </p>
    </button>
  );
};

export default ProvinceSelectItem;
