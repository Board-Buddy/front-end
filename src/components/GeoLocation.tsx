'use client';

import { LoaderCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { Cafe } from '@/types/map';
import { usePathname } from 'next/navigation';
import { useWriteFormContext } from '@/context/WriteFormContext';
import { GEOLOCATION_OPTIONS } from '@/constants/map';
import useGeoLocation from '@/hooks/custom/useGeoLocation';
import CafeInfo from '../containers/map/CafeInfo';
import Map from '../containers/map/Map';
import useAppRouter from '@/hooks/custom/useAppRouter';

interface Props {
  redirectionURL?: string;
}

const GeoLocation = ({ redirectionURL }: Props) => {
  const pathname = usePathname();
  const router = useAppRouter();

  const { formState, setFormState } = useWriteFormContext();
  const { location, error } = useGeoLocation(GEOLOCATION_OPTIONS);

  const [cafeInfo, setCafeInfo] = useState<Cafe | null>(null);

  const handleDirectionButtonClick = () => {};

  const handleSelectButtonClick = () => {
    setFormState({
      ...formState,
      meetingLocation: cafeInfo!.placeName,
      sido: cafeInfo!.sido,
      sgg: cafeInfo!.sgg,
      emd: cafeInfo!.emd,
      x: cafeInfo!.x.toString(),
      y: cafeInfo!.y.toString(),
    });

    router.push({ href: redirectionURL!, headerTitle: '모임 위치 선택' });
  };

  if (!location || error) {
    return (
      <div className="flex h-[calc(100dvh-50px)] items-center justify-center text-primary">
        <LoaderCircleIcon className="size-9 animate-spin" />
      </div>
    );
  }

  return (
    <Map location={location} cafeInfo={cafeInfo} setCafeInfo={setCafeInfo}>
      {pathname.includes('map') && (
        <CafeInfo
          cafe={cafeInfo}
          onClick={handleDirectionButtonClick}
          buttonTitle="길찾기"
        />
      )}
      {pathname.includes('locationSetting') && (
        <CafeInfo
          cafe={cafeInfo}
          onClick={handleSelectButtonClick}
          buttonTitle="이곳에서 만날게요"
        />
      )}
    </Map>
  );
};

export default GeoLocation;
