'use client';

import { useEffect, useState } from 'react';
import useIsWebView from './useIsWebView';

type PermissionStatus = 'undefined' | 'granted' | 'denied';
type PermissionType = 'media-library' | 'location' | 'notification';

const useRequestPermission = (permissionType: PermissionType) => {
  const isWebView = useIsWebView();
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionStatus>('undefined');

  const requestPermission = () => {
    if (!isWebView) return;

    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type: 'PERMISSION_REQUEST',
        permissionType,
      }),
    );
  };

  useEffect(() => {
    if (!isWebView) return;

    const handlePermissionResponse = (e: MessageEvent) => {
      try {
        const { type, state } = JSON.parse(e.data);

        if (type === 'PERMISSION_STATUS' && state) {
          setPermissionStatus(state);
        }
      } catch (error) {
        console.log('응답 형식이 맞지 않습니다. ', error);
      }
    };

    window.addEventListener('message', handlePermissionResponse); // ios
    // @ts-ignore
    document.addEventListener('message', handlePermissionResponse); // android

    return () => {
      window.removeEventListener('message', handlePermissionResponse);
      // @ts-ignore
      document.removeEventListener('message', handlePermissionResponse);
    };
  }, [isWebView, permissionType]);

  return { requestPermission, permissionStatus };
};

export default useRequestPermission;
