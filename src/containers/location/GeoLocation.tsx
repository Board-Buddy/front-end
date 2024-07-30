import { GEOLOCATION_OPTIONS } from '@/constants/map';
import useGeoLocation from '@/hooks/useGeoLocation';
import React from 'react';

const GeoLocation = () => {
  const { location, error } = useGeoLocation(GEOLOCATION_OPTIONS);

  return <div>GeoLocation</div>;
};

export default GeoLocation;
