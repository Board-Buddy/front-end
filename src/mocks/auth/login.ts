import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

interface RequestBody {
  username: string;
  password: string;
}

export const login = http.post<any, RequestBody>(
  `${API_BASE_URL}/api/auth/login`,
  async ({ request }) => {
    const { username, password } = await request.json();

    if (username === 'wrongusername' && password === 'wrongpassword') {
      const result = {
        status: 'failure',
        data: null,
        message: '입력한 비밀번호가 올바르지 않습니다. 비밀번호를 확인하세요.',
      };

      return HttpResponse.json(result, { status: 400 });
    }
    if (username === 'wrongusername') {
      const result = {
        status: 'failure',
        data: null,
        message: '입력한 아이디가 올바르지 않습니다. 아이디를 확인하세요.',
      };

      return HttpResponse.json(result, { status: 400 });
    }

    const result = {
      status: 'success',
      data: {
        profileDTO: {
          nickname: 'yubin',
          memberType: 'REGULAR',
          sido: '서울특별시',
          sgg: '송파구',
          emd: '잠실동',
          isPhoneNumberVerified: true,
          awsS3SavedFileURL: null,
        },
      },
      message: '로그인에 성공하였습니다.',
    };

    return HttpResponse.json(result, { status: 200 });
  },
);
