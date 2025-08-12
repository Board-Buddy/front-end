import {
  MessagePayloadMap,
  MessageType,
  PermissionType,
} from '@/types/webview';

/**
 * React Native 메시지 전송 함수
 */
export const postRNMessage = <T extends keyof MessagePayloadMap>(
  type: T,
  payload?: MessagePayloadMap[T],
) => window.ReactNativeWebView?.postMessage(JSON.stringify({ type, payload }));

/**
 * 앱으로 로그 메시지를 전송하는 함수
 */
export const sendDebugLogToApp = (log: string) => {
  postRNMessage(MessageType.DEBUG, { log });
};

export const STATE_KEYS = {
  ARTICLE_WRITE_FORM: 'article-write-form',
  PROFILE_INFO: 'profile-info',
  ARTICLE_FILTER: 'article-filter',
  SEARCH_FILTER: 'search-filter',
} as const;

export type StateKey = (typeof STATE_KEYS)[keyof typeof STATE_KEYS];

/**
 * 앱에 상태를 저장하는 함수
 * @param stateKey 상태를 식별하기 위한 키
 * @param state 저장할 상태
 */
export const saveStateToApp = (stateKey: StateKey, state: unknown) => {
  if (window.ReactNativeWebView?.postMessage) {
    try {
      postRNMessage(MessageType.SAVE_STATE, { key: stateKey, state });
    } catch (error) {
      sendDebugLogToApp(`앱에 상태를 저장하는 데 실패했습니다. ${error}`);
    }
  } else {
    console.warn(
      'ReactNativeWebView를 사용할 수 없어 상태가 저장되지 않았습니다',
    );
  }
};

/**
 * 권한 요청 래퍼
 */
export const requestPermissionToRN = (permissionType: PermissionType) => {
  postRNMessage(MessageType.PERMISSION_REQUEST, { permissionType });
};
