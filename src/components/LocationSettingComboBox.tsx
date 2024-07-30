'use client';

import { Location } from '@/types/location';
import { useCallback, useState } from 'react';
import { cn } from '@/utils/tailwind';
import { ChevronDown } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { UserInfo } from '@/types/user';
import { Search } from './LocationSearch';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const POPOVER_WIDTH = 'w-[416px]';

interface Props {
  onSelect: (sido: string, sgg: string, emd: string) => void;
}

const LocationSettingComboBox = ({ onSelect }: Props) => {
  const cache = useQueryClient();
  const userInfo = cache.getQueryData(['userInfo']) as UserInfo;

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
    : userInfo.emd
      ? userInfo.emd
      : '동네 선택';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn('justify-between', POPOVER_WIDTH)}
        >
          {displayName}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        className={cn('p-0 bg-white', POPOVER_WIDTH)}
      >
        <Search selectedResult={selected} onSelectResult={handleSetActive} />
      </PopoverContent>
    </Popover>
  );
};

export default LocationSettingComboBox;
