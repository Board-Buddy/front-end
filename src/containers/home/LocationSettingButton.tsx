'use client';

import { ChevronDown } from 'lucide-react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LocationSettingButton = () => {
  const router = useRouter();

  const onClick = () => {
    router.push('/setting/location');
  };

  return (
    <div className="my-4 flex items-center gap-2" onClick={onClick}>
      <Image
        src="/images/sundy/sundy_map.png"
        alt="map_sundy"
        width={18}
        height={28}
      />
      <div className="flex w-[300px] items-center bg-transparent p-0">
        <span className="text-lg font-bold text-gray-800">전체</span>
        <ChevronDown className="ml-1 size-4 shrink-0" />
      </div>
    </div>
  );
};

export default LocationSettingButton;
