'use client';

import { useEffect, useState } from 'react';

interface ILocation {
  latitude: number;
  longitude: number;
}

const useGeoLocation = (options = {}) => {
  const [location, setLocation] = useState<ILocation>();
  const [error, setError] = useState('');

  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;
    setLocation({ latitude, longitude });
  };

  const handleError = (err: GeolocationPositionError) => {
    setError(err.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, [options]);

  return { location, error };
};

export default useGeoLocation;