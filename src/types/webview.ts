import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export enum MessageType {
  ROUTER = 'ROUTER',
  DEBUG = 'DEBUG',
  SAVE_STATE = 'SAVE_STATE',
  RESTORE_STATE = 'RESTORE_STATE',
  REGISTER_STATE = 'REGISTER_STATE',
  PERMISSION_REQUEST = 'PERMISSION_REQUEST',
  PERMISSION_STATUS = 'PERMISSION_STATUS',
  LOCATION = 'LOCATION',
  GET_LOCATION = 'GET_LOCATION',
  TOAST = 'TOAST',
}

export type NavigateMethod = 'PUSH' | 'REPLACE' | 'BACK' | 'FORWARD';
export type RoutePath = '/' | '/chat' | '/map' | '/my' | '/webview';

export interface RouterMessage {
  type: MessageType.ROUTER;
  payload: {
    method: NavigateMethod;
    targetPath: RoutePath;
    webUrl?: string;
    headerTitle?: string;
    options?: NavigateOptions;
  };
}

export interface DebugMessage {
  type: MessageType.DEBUG;
  payload: {
    log: string;
  };
}

export interface SaveStateMessage {
  type: MessageType.SAVE_STATE;
  payload: {
    key: string;
    state: unknown;
  };
}

export interface RestoreStateMessage {
  type: MessageType.RESTORE_STATE;
  payload: {
    key: string;
  };
}

export interface RegisterStateMessage {
  type: MessageType.REGISTER_STATE;
  payload: {
    key: string;
  };
}

export type PermissionType = 'media-library' | 'location' | 'notification';
export type PermissionStatus = 'undetermined' | 'granted' | 'denied';

export interface PermissionRequestMessage {
  type: MessageType.PERMISSION_REQUEST;
  payload: {
    permissionType: PermissionType;
  };
}

export interface GetLocationMessage {
  type: MessageType.GET_LOCATION;
  payload: null;
}

export interface ToastMessage {
  type: MessageType.TOAST;
  payload: {
    type: 'success' | 'info' | 'error';
    title: string;
    description?: string;
    duration?: number;
  };
}

export type WebViewBridgeMessage =
  | RouterMessage
  | DebugMessage
  | SaveStateMessage
  | RestoreStateMessage
  | RegisterStateMessage
  | PermissionRequestMessage
  | GetLocationMessage
  | ToastMessage;

export type MessagePayloadMap = {
  [MessageType.ROUTER]: RouterMessage['payload'];
  [MessageType.DEBUG]: DebugMessage['payload'];
  [MessageType.SAVE_STATE]: SaveStateMessage['payload'];
  [MessageType.RESTORE_STATE]: RestoreStateMessage['payload'];
  [MessageType.REGISTER_STATE]: RegisterStateMessage['payload'];
  [MessageType.PERMISSION_REQUEST]: PermissionRequestMessage['payload'];
  [MessageType.GET_LOCATION]: GetLocationMessage['payload'];
  [MessageType.TOAST]: ToastMessage['payload'];
};
