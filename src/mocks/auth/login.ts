import { HttpResponse } from 'msw';
import { createMockHandler } from '..';
import z from 'zod';
import { ACCOUNT_MOCK } from './register';
import { UserInfo } from '@/types/user';

let loggedInUserInfo: UserInfo | null = null;
export const getLoggedInUserInfo = () => loggedInUserInfo;
export const setLoggedInUserInfo = (userInfo: UserInfo | null) => {
  loggedInUserInfo = userInfo;
};

const RequestBodySchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const login = createMockHandler<{ profileDTO: UserInfo }>({
  method: 'post',
  endpoint: '/auth/login',
  handler: async ({ request }) => {
    const requestBody = await request.json();
    const { data } = RequestBodySchema.safeParse(requestBody);

    if (!data) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message:
            '요청 본문이 잘못된 형식이거나 유효하지 않은 데이터를 포함하고 있습니다. 올바른 형식으로 요청을 다시 시도하세요.',
        },
        { status: 400 },
      );
    }

    const account = ACCOUNT_MOCK.find((acc) => acc.username === data.username);

    // 입력한 아이디가 올바르지 않은 경우
    if (!account) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '입력한 아이디가 올바르지 않습니다. 아이디를 확인하세요.',
        },
        { status: 400 },
      );
    }

    // 입력한 비밀번호가 올바르지 않은 경우
    if (data.password !== account.password) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message:
            '입력한 비밀번호가 올바르지 않습니다. 비밀번호를 확인하세요.',
        },
        { status: 401 },
      );
    }

    loggedInUserInfo = {
      nickname: account.nickname,
      isPhoneNumberVerified: account.isPhoneNumberVerified,
      memberType: account.memberType,
      profileImageSignedURL: account.profileImageSignedURL,
    };

    return HttpResponse.json(
      {
        status: 'success',
        data: {
          profileDTO: {
            nickname: account.nickname,
            isPhoneNumberVerified: account.isPhoneNumberVerified,
            memberType: account.memberType,
            profileImageSignedURL: account.profileImageSignedURL,
          },
        },
        message: '로그인에 성공하였습니다.',
      },
      {
        status: 200,
      },
    );
  },
});
