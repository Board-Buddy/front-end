'use client';

import { useRef, useCallback } from 'react';
import useIsWebView from './useIsWebView';
import { postRNMessage } from '@/utils/webview';
import { MessageType } from '@/types/webview';
import useWebViewMessageHandler from './useWebViewMessageHandler';

export const base64ToFile = (
  base64: string,
  filename = 'image.jpg',
  mimeType = 'image/jpeg',
): File => {
  // base64 문자열에서 실제 데이터 부분만 추출
  const base64Data = base64.split(',')[1];
  const byteString = atob(base64Data);
  const byteNumbers = new Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    byteNumbers[i] = byteString.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  return new File([byteArray], filename, { type: mimeType });
};

interface UseImagePickerOptions {
  onPick: (file: File) => void;
  onError?: (error: Error) => void;
}

const useImagePicker = ({ onPick, onError }: UseImagePickerOptions) => {
  const isWebView = useIsWebView();
  const imageInputRef = useRef<HTMLInputElement>(null);

  // 웹/앱 환경에 따라 이미지 선택 트리거
  const openPicker = useCallback(() => {
    if (isWebView) {
      postRNMessage(MessageType.PICK_IMAGE);
    } else {
      imageInputRef.current?.click();
    }
  }, [isWebView]);

  // 웹뷰에서 이미지 URI 수신 시 File 변환 후 콜백
  useWebViewMessageHandler(MessageType.IMAGE, async (payload) => {
    try {
      if (!payload?.data) return; // 이미지가 선택되지 않은 경우 아무 동작도 하지 않음

      const file = base64ToFile(payload.data);
      onPick(file);
    } catch (err) {
      onError?.(err as Error);
    }
  });

  return { imageInputRef, openPicker };
};

export default useImagePicker;
