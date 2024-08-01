'use client';

import useGeoLocation from '@/hooks/useGeoLocation';
import { LoaderCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { Cafe } from '@/types/map';
import { usePathname, useRouter } from 'next/navigation';
import { useWriteFormContext } from '@/context/WriteFormContext';
import { GEOLOCATION_OPTIONS } from '@/constants/map';
import CafeInfo from '../containers/map/CafeInfo';
import Map from '../containers/map/Map';

interface Props {
  redirectionURL?: string;
}

const GeoLocation = ({ redirectionURL }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const { formState, setFormState } = useWriteFormContext();
  const { location, error } = useGeoLocation(GEOLOCATION_OPTIONS);

  const [cafeInfo, setCafeInfo] = useState<Cafe | null>(null);

  const handleDirectionButtonClick = () => {};

  const handleSelectButtonClick = () => {
    setFormState({
      ...formState,
      meetingLocation: cafeInfo!.placeName,
      x: cafeInfo!.x,
      y: cafeInfo!.y,
    });

    router.push(redirectionURL!);
  };

  if (!location || error) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-50px)] text-primary">
        <LoaderCircleIcon className="animate-spin size-9" />
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
