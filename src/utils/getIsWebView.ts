'use server';

import { headers } from 'next/headers';

/**
 * 헤더를 통해 웹뷰 여부를 확인하는 함수
 */
export const getIsWebView = async () => {
  const headerList = headers();

  return headerList.get('x-webview') === 'true';
};
