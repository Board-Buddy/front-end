import api from '@/services';

/** 로그인 API */
export const login = (data: { username: string; password: string }) =>
  api.post('/api/auth/login', data);

/** 로그인 확인 API */
export const checkUserLogin = () => api.get('/api/auth/status');
