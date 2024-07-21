import api from '@/services';

/** 유저 위치 설정 API */
export const setLocation = ({ sido, sigu, dong }: { [key: string]: string }) =>
  api.post('/api/locations', { sido: sido, sigu: sigu, dong: dong });

/** 위치 반경 설정 API */
export const setRadius = ({ radius }: { radius: 2 | 5 | 7 | 10 }) =>
  api.post('/api/locations', { radius: radius });
