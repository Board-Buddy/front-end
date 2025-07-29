import AppLink from '@/components/AppLink';
import LoginForm from '@/containers/login/LoginForm';
import Image from 'next/image';
import { Suspense } from 'react';

const page = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-primary px-8">
      <div className="self-start text-3xl text-white">
        <p>안녕하세요:)</p>
        <p>
          <span className="font-extrabold">보드버디</span> 입니다.
        </p>
      </div>
      <div className="relative mb-20 mt-12 w-full rounded-3xl bg-white px-6 py-8">
        <Image
          src="/images/sundy/sundy_heart.png"
          alt="하트를 들고 있는 썬디"
          width={92}
          height={162}
          className="absolute -top-[77px] right-4"
        />
        <span className="text-xl font-bold text-gray-800">LOGIN</span>
        <Suspense>
          <div className="mt-8">
            <LoginForm />
          </div>
        </Suspense>
        <div className="mt-6 w-full border-t border-dashed" />
        <div>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-gray-600">
            <Suspense>
              <AppLink href="/register/terms">회원가입</AppLink>
            </Suspense>
            <div className="h-[12px] border border-gray-500" />
            <p>아이디 찾기</p>
            <div className="h-[12px] border border-gray-500" />
            <p>비밀번호 찾기</p>
          </div>
        </div>
      </div>
      <Image
        src="/images/logo/boardbuddy_logo_white.png"
        alt="보드버디 흰색 로고"
        width={130}
        height={65}
      />
    </div>
  );
};

export default page;
