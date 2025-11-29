'use client';

import { Location } from '@/types/map';
import { useEffect, useState } from 'react';
import useIsWebView from './useIsWebView';

const useGeoLocation = (options = {}) => {
  const isWebView = useIsWebView();

  const [location, setLocation] = useState<Location | null>(null);
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
    if (isWebView) return;

    const { geolocation } = navigator;

    if (!geolocation) {
      // 동기적으로 setState를 호출하지 않고 비동기 처리
      Promise.resolve().then(() =>
        setError('해당 기능이 지원되지 않는 브라우저입니다.'),
      );

      return;
    }

    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, [options, isWebView]);

  return { location, error };
};

export default useGeoLocation;
