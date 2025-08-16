'use client';

import { useState, useEffect } from 'react';
import useRequestPermission from './useRequestPermission';
import useIsWebView from './useIsWebView';
import { Location } from '@/types/map';
import { postRNMessage } from '@/utils/webview';
import { MessageType } from '@/types/webview';
import useWebViewMessageHandler from './useWebViewMessageHandler';

const useAppLocation = () => {
  const isWebView = useIsWebView();
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { permissionStatus, requestPermission } =
    useRequestPermission('location');

  // 권한 요청
  useEffect(() => {
    if (!isWebView) return;

    requestPermission();
  }, [isWebView, requestPermission]);

  // 권한 상태 변화에 따른 위치 요청 또는 에러 처리
  useEffect(() => {
    if (!isWebView) return;

    if (permissionStatus === 'granted') {
      postRNMessage(MessageType.GET_LOCATION);
    } else if (permissionStatus === 'denied') {
      setError(
        `보드게임 카페 지도를 이용하시려면\n설정에서 위치 권한을 허용해주세요.`,
      );
    }
  }, [isWebView, permissionStatus]);

  // 위치 응답 처리
  useWebViewMessageHandler(MessageType.LOCATION, (payload) =>
    setLocation(payload),
  );

  return { location, error };
};

export default useAppLocation;
