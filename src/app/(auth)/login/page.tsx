import LoginForm from '@/containers/login/LoginForm';
import Image from 'next/image';
import Link from 'next/link';

const page = () => {
  return (
    <div className="bg-primary w-full h-[100vh] flex flex-col justify-center items-center px-8">
      <div className="text-white text-3xl self-start">
        <p>안녕하세요:)</p>
        <p>
          <span className="font-extrabold">보드버디</span> 입니다.
        </p>
      </div>
      <div className="relative w-full bg-white rounded-3xl px-6 py-8 mt-12 mb-20">
        <Image
          src="/images/sundy/sundy_heart.png"
          alt="하트를 들고 있는 썬디"
          width={92}
          height={162}
          className="absolute right-4 -top-[77px]"
        />
        <span className="text-gray-800 text-xl font-bold">LOGIN</span>
        <div className="mt-8">
          <LoginForm />
        </div>
        <div className="mt-6 w-full border-t border-dashed" />
        <div>
          <div className="flex justify-center gap-2 mt-6 text-gray-600 font-semibold text-sm items-center">
            <Link href="/register/terms">회원가입</Link>
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
