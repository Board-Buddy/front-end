import api from '@/services';

/** 유저 로그인 확인 API */
export const checkUserLogin = async () =>
  (await api.get('/api/auth/status')).data;
