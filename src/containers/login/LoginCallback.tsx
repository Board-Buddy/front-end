'use client';

import { useSearchParams } from 'next/navigation';
import OAuthLoginFailure from './OAuthLoginFailure';
import OAuthLoginSuccess from './OAuthLoginSuccess';
import OAuthVerifiedFailure from './OAuthVerifiedFailure';

const LoginCallback = () => {
  const params = useSearchParams();

  const isLoginSucceed = params.get('isLoginSucceed') === 'true';
  const isVerifiedMember = params.get('isVerifiedMember') === 'true';
  const messageCode = params.get('messageCode');

  return (
    <>
      {isLoginSucceed && isVerifiedMember && <OAuthLoginSuccess />}
      {isLoginSucceed && !isVerifiedMember && <OAuthVerifiedFailure />}
      {!isLoginSucceed && (
        <OAuthLoginFailure messageCode={Number(messageCode)} />
      )}
    </>
  );
};

export default LoginCallback;
