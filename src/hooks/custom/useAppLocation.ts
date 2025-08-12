'use client';

import { useState, useEffect } from 'react';
import useRequestPermission from './useRequestPermission';
import useIsWebView from './useIsWebView';
import { errorToast } from '@/utils/customToast';
import { Location } from '@/types/map';
import { postRNMessage } from '@/utils/webview';
import { MessageType } from '@/types/webview';

const useAppLocation = () => {
  const isWebView = useIsWebView();
  const [location, setLocation] = useState<Location | null>(null);

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
      // 권한 허용되었을 때 위도, 경도 가져오기
      postRNMessage(MessageType.GET_LOCATION);
    } else if (permissionStatus === 'denied') {
      errorToast(
        'request denied',
        '보드게임 카페 지도를 이용하시려면 위치 권한을 허용해주세요.',
      );
    }
  }, [isWebView, permissionStatus]);

  // 위치 응답 처리
  useEffect(() => {
    if (!isWebView) return;

    const handleLocationResponse = (e: MessageEvent) => {
      try {
        const { type, state } = JSON.parse(e.data);

        if (type === 'LOCATION' && state) {
          setLocation({ latitude: state.latitude, longitude: state.longitude });
        }
      } catch (error) {
        console.log('응답 형식이 맞지 않습니다. ', error);
      }
    };

    window.addEventListener('message', handleLocationResponse); // ios
    // @ts-ignore
    document.addEventListener('message', handleLocationResponse); // android

    return () => {
      window.removeEventListener('message', handleLocationResponse);
      // @ts-ignore
      document.removeEventListener('message', handleLocationResponse);
    };
  }, [isWebView]);

  return { location };
};

export default useAppLocation;
