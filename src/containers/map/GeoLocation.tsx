'use client';

import useGeoLocation from '@/hooks/useGeoLocation';
import { LoaderCircleIcon } from 'lucide-react';
import Map from './Map';
import MapInfo from './MapInfo';
import { useState } from 'react';
import { Cafe } from '@/types/map';

declare global {
  interface Window {
    kakao: any;
  }
}

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
};

const GeoLocation = () => {
  const { location, error } = useGeoLocation(geolocationOptions);

  const [cafeInfo, setCafeInfo] = useState<Cafe | null>(null);

  if (!location || error) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-50px)] text-primary">
        <LoaderCircleIcon className="animate-spin size-9" />
      </div>
    );
  }

  return (
    <Map location={location} cafeInfo={cafeInfo} setCafeInfo={setCafeInfo}>
      <MapInfo cafe={cafeInfo} />
    </Map>
  );
};

export default GeoLocation;
