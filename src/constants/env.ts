export const API_VERSION = '/api/v1';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_SERVER_URL + API_VERSION;
export const WS_BASE_URL = process.env.NEXT_PUBLIC_WS_SERVER_URL + API_VERSION;
export const MSW_MOCKING = process.env.NEXT_PUBLIC_API_MOCKING;
export const KAKAO_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
