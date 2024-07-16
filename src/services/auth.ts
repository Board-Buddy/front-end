import api from '@/services';

/** 유저 로그인 확인 API */
export const checkUserLogin = () => api.get('/api/auth/status');
