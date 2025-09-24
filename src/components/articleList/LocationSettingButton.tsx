'use client';

import { NATION_WIDE } from '@/containers/location/LocationFilter';
import useAppRouter from '@/hooks/custom/useAppRouter';
import { GetArticleRequestParams } from '@/types/article';
import { Province } from '@/types/location';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import SundyMap from '@images/sundy/sundy_map.png';

interface Props extends Pick<GetArticleRequestParams, 'sgg'> {
  route: string;
  province: Province | null;
}

const getLocationLabel = (
  sgg: string | null | undefined,
  province: Province | null,
) => {
  if (sgg) return sgg;
  if (!province?.name || province.name === NATION_WIDE.name)
    return NATION_WIDE.name;

  return province.name;
};

const LocationSettingButton = ({ sgg, route, province }: Props) => {
  const router = useAppRouter();

  const onClick = () => {
    router.push({ href: route, headerTitle: '지역 필터 선택' });
  };

  return (
    <div
      className="mb-2 mt-4 inline-flex items-center justify-start gap-2"
      onClick={onClick}
      role="button"
      aria-label="지역 필터 설정"
      tabIndex={0}
    >
      <Image src={SundyMap} alt="" role="presentation" width={18} height={28} />
      <div className="flex items-center bg-transparent p-0">
        <span className="text-lg font-bold text-gray-800">
          {getLocationLabel(sgg, province)}
        </span>
        <ChevronDown className="ml-1 size-4 shrink-0" />
      </div>
    </div>
  );
};

export default LocationSettingButton;
