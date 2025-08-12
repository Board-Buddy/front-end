'use client';

import { Location } from '@/types/map';
import { useEffect, useState } from 'react';

const useGeoLocation = (options = {}) => {
  const [location, setLocation] = useState<Location>();
  const [error, setError] = useState<string | null>(null);

  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude } = pos.coords;
    setLocation({ latitude, longitude });
  };

  const handleError = (error: GeolocationPositionError) => {
    if (error.code === error.PERMISSION_DENIED) {
      setError('위치 접근 권한이 거부되었습니다.');
      return;
    }

    setError('위치 가져오기에 실패했습니다.');
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setError('해당 기능이 지원되지 않는 브라우저입니다.');
      return;
    }

    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, [options]);

  return { location, error };
};

export default useGeoLocation;
