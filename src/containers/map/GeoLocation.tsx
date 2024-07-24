'use client';

import useGeoLocation from '@/hooks/useGeoLocation';
import { LoaderCircleIcon } from 'lucide-react';
import Map from './Map';

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

  if (!location || error) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-50px)] text-primary">
        <LoaderCircleIcon className="animate-spin size-9" />
      </div>
    );
  }

  return <Map location={location} />;
};

export default GeoLocation;
