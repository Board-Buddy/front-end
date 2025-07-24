export const STATE_KEYS = {
  ARTICLE_WRITE_FORM: 'article-write-form',
  ARTICLE_EDIT_FORM: 'article-edit-form',
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
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: 'SAVE_STATE',
        key: stateKey,
        state,
      }),
    );
  }
};
