import { HttpResponse } from 'msw';
import { createMockHandler } from '..';
import z from 'zod';
import { UserInfo } from '@/types/user';

type Account = {
  id: number;
  username: string;
  password: string;
  phoneNumber: string;
} & UserInfo;

export const ACCOUNT_MOCK: Account[] = [
  {
    id: 1,
    username: 'user1',
    password: 'Password1234!',
    nickname: 'user1',
    phoneNumber: '010-1234-5678',
    isPhoneNumberVerified: true,
    memberType: 'REGULAR',
    profileImageSignedURL: null,
  },
  {
    id: 2,
    username: 'user2',
    password: 'Password1234!',
    nickname: 'user2',
    phoneNumber: '010-2345-6789',
    isPhoneNumberVerified: true,
    memberType: 'SOCIAL',
    profileImageSignedURL: null,
  },
];

// NOTE 런타임 타입 검사를 위해 MSW 핸들러에서만 zod 스키마 사용, 추후 확대 적용 고려
const RequestBodySchema = z.object({
  username: z.string(),
  password: z.string(),
  nickname: z.string(),
  phoneNumber: z.string(),
});

export const register = createMockHandler<null>({
  method: 'post',
  endpoint: 'auth/register',
  handler: async ({ request }) => {
    const requestBody = await request.json();
    const { data } = RequestBodySchema.safeParse(requestBody);

    if (!data) {
      return HttpResponse.json(
        {
          status: 'failure' as const,
          data: null,
          message:
            '요청 본문이 잘못된 형식이거나 유효하지 않은 데이터를 포함하고 있습니다. 올바른 형식으로 요청을 다시 시도하세요.',
        },
        { status: 400 },
      );
    }

    // 500 에러 테스트용
    if (data.username === 'failure') {
      return HttpResponse.json(
        {
          status: 'error',
          data: null,
          message:
            '서버 문제로 회원가입에 실패하였습니다. 관리자에게 문의하세요.',
        },
        { status: 500 },
      );
    }

    ACCOUNT_MOCK.push({
      id: ACCOUNT_MOCK.length + 1,
      username: data.username,
      password: data.password,
      nickname: data.nickname,
      phoneNumber: data.phoneNumber,
      isPhoneNumberVerified: true,
      memberType: 'REGULAR',
      profileImageSignedURL: null,
    });

    return HttpResponse.json(
      {
        status: 'success',
        data: null,
        message: '회원가입이 완료되었습니다.',
      },
      { status: 200 },
    );
  },
});
