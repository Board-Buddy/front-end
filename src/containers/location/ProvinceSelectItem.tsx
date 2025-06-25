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
        'px-9 py-4',
        selectedProvince?.code === province.code &&
          'bg-white border-y-gray-200 ',
      )}
      onClick={() => onSelectProvince(province)}
    >
      <p
        className={cn(
          'text-base font-semibold text-gray-500',
          selectedProvince?.code === province.code && 'text-gray-950',
        )}
      >
        {province.name}
      </p>
    </button>
  );
};

export default ProvinceSelectItem;
