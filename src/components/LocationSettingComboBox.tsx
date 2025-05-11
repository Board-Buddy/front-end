'use client';

import { Location } from '@/types/location';
import { useCallback, useState } from 'react';
import { cn } from '@/utils/tailwind';
import { ChevronDown } from 'lucide-react';
import { getUserInfo } from '@/utils/userInfoStorage';
import { Search } from './LocationSearch';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface Props {
  popOverWidth: number;
  onSelect: (sido: string, sgg: string, emd: string) => void;
}

const LocationSettingComboBox = ({ popOverWidth, onSelect }: Props) => {
  const userInfo = getUserInfo();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Location | undefined>();

  const handleSetActive = useCallback(
    (location: Location) => {
      onSelect(location.sido, location.sgg, location.emd);
      setSelected(location);
      setOpen(false);
    },
    [onSelect],
  );

  const displayName = selected
    ? selected.emd
    : userInfo
      ? userInfo.emd
      : '동네 선택';

  const popOverWidthTW: { [key: number]: string } = {
    408: 'w-[408px]',
    416: 'w-[416px]',
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            'justify-between px-3 py-2 w-full',

            displayName === '동네 선택' && 'text-muted',
          )}
        >
          {displayName}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" className={cn('p-0 bg-white')}>
        <Search selectedResult={selected} onSelectResult={handleSetActive} />
      </PopoverContent>
    </Popover>
  );
};

export default LocationSettingComboBox;
