'use client';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import locationList from '@/containers/location/locationList.json';
import { cn } from '@/utils/tailwind';
import { Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { UserInfo } from '@/types/user';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation, useRadius } from '@/hooks/useSetting';

const LocationRadiusSetting = () => {
  const [open, setOpen] = useState(false);

  const cache = useQueryClient();
  const userInfo = cache.getQueryData(['userInfo']) as UserInfo;
  const locationString = `${userInfo.sido} ${userInfo.sigu} ${userInfo.dong}`;

  const [location, setLocation] = useState(locationString);
  const [value, setValue] = useState(0);

  const locationMutation = useLocation();
  const radiusMutation = useRadius();

  const onSelect = (loc: string) => {
    const selectedLocation = loc.split(' ');
    locationMutation.mutate({
      sido: selectedLocation[0],
      sigu: selectedLocation[1],
      dong: selectedLocation[2],
    });
  };

  const onValueChange = () => {
    const radiusOptions = [2, 5, 7, 10] as const;
    radiusMutation.mutate({ radius: radiusOptions[value] });
  };

  return (
    <div className="bg-white rounded-t-2xl shadow-[0_-2px_10px_0_rgba(48,48,48,0.1)]">
      <div className="flex flex-col p-4 gap-4">
        <span>내 동네 설정</span>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              role="combobox"
              aria-expanded={open}
              className="flex items-center p-0 bg-primary w-[416px]"
            >
              <div className="flex items-center text-md font-bold text-white">
                <span>
                  {location
                    ? locationList.find((dong) => dong.label === location)
                        ?.value
                    : '동네 설정 필요'}
                </span>
                <ChevronDown className="ml-1 h-4 w-4 shrink-0" />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[416px] p-0 bg-white border-gray-500">
            <Command>
              <CommandInput
                placeholder="동명으로 검색(ex. 서초동)"
                className="border-gray-500"
              />
              <CommandEmpty>검색 결과가 없습니다.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {locationList.map((dong) => (
                    <CommandItem
                      key={dong.label}
                      value={dong.label}
                      onSelect={(currentValue) => {
                        setLocation(currentValue);
                        onSelect(currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          location === dong.label ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      {dong.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Slider
          defaultValue={[0]}
          value={[value]}
          onValueChange={() => {
            setValue(value);
            onValueChange();
          }}
          min={0}
          max={3}
          step={1}
        />
        <div className="flex justify-between text-sm text-gray-800">
          <div>2km</div>
          <div>5km</div>
          <div>7km</div>
          <div>10km</div>
        </div>
      </div>
    </div>
  );
};

export default LocationRadiusSetting;
