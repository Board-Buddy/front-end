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
import { cn } from '@/utils/tailwind';
import { Check, ChevronDown } from 'lucide-react';

import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import locationList from './locationList.json';

interface Props {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
}

const LocationSettingButton = ({ location, setLocation }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center my-4 gap-2">
      <Image
        src="/images/sundy/sundy_map.png"
        alt="map_sundy"
        width={18}
        height={28}
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            role="combobox"
            aria-expanded={open}
            className="flex items-center p-0 bg-transparent w-[300px]"
          >
            <span className="text-lg font-bold text-gray-800">
              {location
                ? locationList.find((dong) => dong.label === location)?.value
                : '동네 설정 필요'}
            </span>
            <ChevronDown className="ml-1 h-4 w-4 shrink-0" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0 bg-white border-gray-500">
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
    </div>
  );
};

export default LocationSettingButton;
