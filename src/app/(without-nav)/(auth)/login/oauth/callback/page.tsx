'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const page = () => {
  const router = useRouter();
  const params = useSearchParams();

  const isLoginSucceed = params.get('isLoginSucceed');
  const isVerifiedMember = params.get('isVerifiedMember');
  const messageCode = params.get('messageCode');

  // 휴대폰 인증이 완료된 사용자가 로그인했을 때
  if (isLoginSucceed && isVerifiedMember) {
    router.push('/home');
  }

  // 휴대폰 인증이 미완료된 사용자가 로그인했을 때
  // 휴대폰/지역 설정 페이지로 이동
  if (isLoginSucceed) {
    router.push('/register/additionalSettings');
  }

  if (!isLoginSucceed) {
    return <div>{OAUTH_LOGIN_MESSAGE_CODE[Number(messageCode)]}</div>;
  }

  return <div></div>;
};

export default page;
