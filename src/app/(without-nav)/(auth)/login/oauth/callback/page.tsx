'use client';

import { OAUTH_LOGIN_MESSAGE_CODE } from '@/constants/auth';
import { useUserLoginCheck } from '@/hooks/useAuth';
import { LoaderCircleIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const Page = () => {
  const router = useRouter();
  const params = useSearchParams();

  const isLoginSucceed = params.get('isLoginSucceed') === 'true';
  const isVerifiedMember = params.get('isVerifiedMember') === 'true';
  const messageCode = params.get('messageCode');

  const [getUserInfo, setGetUserInfo] = useState(false);

  const { isSuccess, error } = useUserLoginCheck({
    isReady: getUserInfo,
  });

  useEffect(() => {
    // 소셜 로그인에 성공한 경우
    if (isLoginSucceed) {
      // 휴대폰 인증이 완료된 사용자가 로그인했을 때
      if (isVerifiedMember) {
        setGetUserInfo(true);
      } else {
        // 휴대폰 인증이 미완료된 사용자가 로그인했을 때
        // 휴대폰/지역 설정 페이지로 이동
        router.push('/register/additionalSettings');
      }
    } else {
      // 소셜 로그인에 실패한 경우
      alert(OAUTH_LOGIN_MESSAGE_CODE[Number(messageCode)]);
      router.push('/login');
    }
  }, [isLoginSucceed, isVerifiedMember, messageCode, router]);

  useEffect(() => {
    if (isSuccess) {
      alert('로그인 되었습니다.');
      router.push('/home');
    }
  }, [isSuccess, error, router]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <LoaderCircleIcon className="animate-spin text-primary size-6" />
    </div>
  );
};

export default Page;
