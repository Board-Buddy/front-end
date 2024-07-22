import api from '@/services';

/** 아이디 중복 검사 API */
export const checkIdDuplicate = async (id: string) => {
  try {
    const response = await api.post(`/api/auth/check-username`, {
      username: id,
    });

    return {
      status: 'success',
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error: any) {
    if (error.response) {
      // 서버 응답 오류 처리
      return {
        status: 'error',
        message: error.response.data.message || '서버 오류가 발생했습니다.',
      };
    }
    // 기타 오류 처리
    return {
      status: 'error',
      message: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.',
    };
  }
};

/** 닉네임 중복 검사 API  */
export const checkNicknameDuplicate = async (nickname: string) => {
  try {
    const response = await api.post(`/api/auth/check-nickname`, {
      nickname,
    });

    return {
      status: 'success',
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error: any) {
    if (error.response) {
      // 서버 응답 오류 처리
      return {
        status: 'error',
        message: error.response.data.message || '서버 오류가 발생했습니다.',
      };
    }
    // 기타 오류 처리
    return {
      status: 'error',
      message: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.',
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
    if (error.response) {
      // 서버 응답 오류 처리
      return {
        status: 'error',
        message: error.response.data.message || '서버 오류가 발생했습니다.',
      };
    }
    // 기타 오류 처리
    return {
      status: 'error',
      message: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.',
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
      status: 'success',
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error: any) {
    if (error.response) {
      // 서버 응답 오류 처리
      return {
        status: 'error',
        message: error.response.data.message || '서버 오류가 발생했습니다.',
      };
    }
    // 기타 오류 처리
    return {
      status: 'error',
      message: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.',
    };
  }
};

/** 회원가입 API */
export const register = async (data: {
  username: string;
  password: string;
  nickname: string;
  phoneNumber: string;
  sido: string;
  sigu: string;
  dong: string;
}) => {
  try {
    const response = await api.post('/api/auth/register', data);

    return {
      status: 'success',
      data: response.data.data,
      message: response.data.message,
    };
  } catch (error: any) {
    if (error.response) {
      // 서버 응답 오류 처리
      return {
        status: 'error',
        message: error.response.data.message || '서버 오류가 발생했습니다.',
      };
    }
    // 기타 오류 처리
    return {
      status: 'error',
      message: '알 수 없는 오류가 발생했습니다. 다시 시도해주세요.',
    };
  }
};

/** 로그인 API */
export const login = (data: { username: string; password: string }) =>
  api.post('/api/auth/login', data);

/** 로그인 확인 API */
export const checkUserLogin = () => api.get('/api/auth/status');
