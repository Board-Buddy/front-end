'use client';

import { ChevronDown } from 'lucide-react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { UserInfo } from '@/types/user';

const LocationSettingButton = () => {
  const router = useRouter();

  const cache = useQueryClient();
  const userInfo = cache.getQueryData(['userInfo']) as UserInfo;
  const { emd } = userInfo;

  const onClick = () => {
    router.push('/setting/location');
  };

  return (
    <div className="flex items-center my-4 gap-2" onClick={onClick}>
      <Image
        src="/images/sundy/sundy_map.png"
        alt="map_sundy"
        width={18}
        height={28}
      />
      <div className="flex items-center p-0 bg-transparent w-[300px]">
        <span className="text-lg font-bold text-gray-800">{emd}</span>
        <ChevronDown className="ml-1 h-4 w-4 shrink-0" />
      </div>
    </div>
  );
};

export default LocationSettingButton;
