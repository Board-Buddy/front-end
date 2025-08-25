import AppLink from '@/components/AppLink';
import CredentialFindButton from '@/containers/login/CredentialFindButton';
import LoginForm from '@/containers/login/LoginForm';
import Image from 'next/image';

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
          className="absolute right-4 top-[-88px]"
        />
        <span className="text-xl font-bold text-gray-800">LOGIN</span>
        <div className="mt-8">
          <LoginForm />
        </div>
        <div className="mt-6 w-full border-t border-dashed" />
        <div>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm font-semibold text-gray-600">
            <AppLink href="/register/accounts" headerTitle="회원가입">
              회원가입
            </AppLink>

            <div className="h-[12px] border border-gray-500" />
            <CredentialFindButton title="아이디" />
            <div className="h-[12px] border border-gray-500" />
            <CredentialFindButton title="비밀번호" />
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
