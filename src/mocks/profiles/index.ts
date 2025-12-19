import { HttpResponse } from 'msw';
import { getUserProfile } from './[nickname]';
import { createMockHandler } from '..';

const editProfile = createMockHandler<null>({
  method: 'put',
  endpoint: '/profiles',
  handler: async ({ request }) => {
    const data = await request.formData();

    // NOTE: 실제 프로필 수정 처리 X, 로그만 출력
    for (const [key, value] of data.entries()) {
      console.log(key, value);
    }

    return HttpResponse.json(
      {
        status: 'success',
        data: null,
        message: '프로필이 수정되었습니다.',
      },
      { status: 200 },
    );
  },
});

export const profileHandlers = [getUserProfile, editProfile];
