'use client';

import { useState } from 'react';
import { MessageType, PermissionStatus, PermissionType } from '@/types/webview';
import { requestPermissionToRN } from '@/utils/webview';
import useWebViewMessageHandler from './useWebViewMessageHandler';

const useRequestPermission = (permissionType: PermissionType) => {
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionStatus>('undetermined');

  const requestPermission = () => requestPermissionToRN(permissionType);

  useWebViewMessageHandler(MessageType.PERMISSION_STATUS, (state) =>
    setPermissionStatus(state.status),
  );

  return { requestPermission, permissionStatus };
};

export default useRequestPermission;
