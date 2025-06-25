'use client';

import { GetArticleRequestParams } from '@/types/article';
import { ChevronDown } from 'lucide-react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props extends Pick<GetArticleRequestParams, 'sido' | 'sgg'> {
  route: string;
}

const LocationSettingButton = ({ sido, sgg, route }: Props) => {
  const router = useRouter();

  const onClick = () => {
    router.push(route);
  };

  return (
    <div className="mb-2 mt-4 flex items-center gap-2" onClick={onClick}>
      <Image
        src="/images/sundy/sundy_map.png"
        alt="map_sundy"
        width={18}
        height={28}
      />
      <div className="flex w-[300px] items-center bg-transparent p-0">
        <span className="text-lg font-bold text-gray-800">
          {sgg ? sgg : (sido ?? '전체')}
        </span>
        <ChevronDown className="ml-1 size-4 shrink-0" />
      </div>
    </div>
  );
};

export default LocationSettingButton;
