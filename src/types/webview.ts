import { StateKey } from '@/utils/webview';
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
  PICK_IMAGE = 'PICK_IMAGE',
  IMAGE = 'IMAGE',
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
    key: StateKey;
    state: unknown;
  };
}

export interface RegisterStateMessage {
  type: MessageType.REGISTER_STATE;
  payload: {
    key: string;
  };
}

export type PermissionType = 'location' | 'notification';
export type PermissionStatus = 'undetermined' | 'granted' | 'denied';

export interface PermissionRequestMessage {
  type: MessageType.PERMISSION_REQUEST;
  payload: {
    permissionType: PermissionType;
  };
}

export interface PermissionStatusMessage {
  type: MessageType.PERMISSION_STATUS;
  payload: {
    status: PermissionStatus;
  };
}

export interface LocationMessage {
  type: MessageType.LOCATION;
  payload: {
    latitude: number;
    longitude: number;
  };
}

export interface GetLocationMessage {
  type: MessageType.GET_LOCATION;
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

export interface PickImageMessage {
  type: MessageType.PICK_IMAGE;
}

export interface ImageMessage {
  type: MessageType.IMAGE;
  payload: {
    data: string;
  };
}

export type WebViewBridgeMessage =
  | RouterMessage
  | DebugMessage
  | SaveStateMessage
  | RestoreStateMessage
  | RegisterStateMessage
  | PermissionRequestMessage
  | PermissionStatusMessage
  | GetLocationMessage
  | LocationMessage
  | ToastMessage
  | PickImageMessage
  | ImageMessage;

export type MessagePayloadMap = {
  [MessageType.ROUTER]: RouterMessage['payload'];
  [MessageType.DEBUG]: DebugMessage['payload'];
  [MessageType.SAVE_STATE]: SaveStateMessage['payload'];
  [MessageType.RESTORE_STATE]: RestoreStateMessage['payload'];
  [MessageType.REGISTER_STATE]: RegisterStateMessage['payload'];
  [MessageType.PERMISSION_STATUS]: PermissionStatusMessage['payload'];
  [MessageType.PERMISSION_REQUEST]: PermissionRequestMessage['payload'];
  [MessageType.LOCATION]: LocationMessage['payload'];
  [MessageType.GET_LOCATION]: null;
  [MessageType.TOAST]: ToastMessage['payload'];
  [MessageType.PICK_IMAGE]: null;
  [MessageType.IMAGE]: ImageMessage['payload'];
};
