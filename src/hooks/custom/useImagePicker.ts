'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import useRequestPermission from './useRequestPermission';
import useIsWebView from './useIsWebView';
import { errorToast } from '@/utils/customToast';

const useImagePicker = () => {
  const isWebView = useIsWebView();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState(false);
  const { permissionStatus, requestPermission } =
    useRequestPermission('media-library');

  const openPicker = useCallback(() => {
    if (isWebView) {
      setPending(true);
      requestPermission();
    } else {
      imageInputRef.current?.click();
    }
  }, [isWebView, requestPermission]);

  useEffect(() => {
    if (!isWebView) return;
    if (!pending) return;

    if (permissionStatus === 'granted') {
      imageInputRef.current?.click();
      setPending(false);
    } else if (permissionStatus === 'denied') {
      errorToast('request denied', '갤러리 접근 권한 요청이 거부되었습니다.');
      setPending(false);
    }
  }, [isWebView, permissionStatus, pending]);

  return { imageInputRef, openPicker };
};

export default useImagePicker;
