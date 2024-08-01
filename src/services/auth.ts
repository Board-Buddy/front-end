import api from '@/services';
import handleApiError from '@/utils/handleApiError';

/** 아이디 중복 검사 API */
export const checkIdDuplicate = async (id: string) => {
  try {
    const response = await api.post(`/api/auth/username/check`, {
      username: id,
    });

    return {
      status: 'success',
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      status: error.response.data.status,
      data: error.response.data.data,
      message: error.response.data.message,
    };
  }
};

/** 닉네임 중복 검사 API  */
export const checkNicknameDuplicate = async (nickname: string) => {
  try {
    const response = await api.post(`/api/auth/nickname/check`, {
      nickname,
    });

    return {
      status: 'success',
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      status: error.response.data.status,
      data: error.response.data.data,
      message: error.response.data.message,
    };
  }
};

/** SMS 인증 메시지 전송 API */
export const smsCertificationSend = async (phoneNumber: string) => {
  try {
    const response = await api.post(`/api/auth/sms-certifications/send`, {
      phoneNumber,
    });

    return {
      status: 'success',
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      status: error.response.data.status,
      data: error.response.data.data,
      message: error.response.data.message,
    };
  }
};

/** SMS 인증 API */
export const smsCertificationVerify = async (data: {
  phoneNumber: string;
  certificationNumber: string;
}) => {
  try {
    const response = await api.post(`/api/auth/sms-certifications/verify`, {
      phoneNumber: data.phoneNumber,
      certificationNumber: data.certificationNumber,
    });

    return {
      status: response.data.status,
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      status: error.response.data.status,
      data: error.response.data.data,
      message: error.response.data.message,
    };
  }
};

/** 회원가입 API */
export const register = async (data: {
  username: string;
  password: string;
  email: string;
  nickname: string;
  phoneNumber: string;
  sido: string;
  sgg: string;
  emd: string;
}) => {
  try {
    const response = await api.post('/api/auth/register', data);

    return {
      status: 'success',
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      status: error.response.data.status,
      data: error.response.data.data,
      message: error.response.data.message,
    };
  }
};

/** 로그인 API */
export const login = (data: { username: string; password: string }) =>
  api
    .post('/api/auth/login', data)
    .then((response) => response.data.data.profileDTO);

/** 로그인 확인 API */
export const checkUserLogin = () =>
  api.get('/api/auth/status').then((response) => response.data.data.profileDTO);

/** 소셜 로그인 추가 인증 API */
export const oauthRegister = async (data: {
  phoneNumber: string;
  sido: string;
  sgg: string;
  emd: string;
}) => {
  try {
    const response = await api.post('/api/auth/oauth2/register', data);

    return {
      status: 'success',
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      status: error.response.data.status,
      data: error.response.data.data,
      message: error.response.data.message,
    };
  }
};
