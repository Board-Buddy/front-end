import { Separator } from '@/components/ui/separator';
import LoginForm from '@/containers/login/LoginForm';
import Image from 'next/image';
import Link from 'next/link';

const page = () => {
  return (
    <>
      <div>
        <span className="font-bold text-xl">보드버디 로그인</span>
        <p className="text-gray-600 font-semibold">
          보드게임 할 사람, 여기 버디 모여라!
        </p>
      </div>
      <div className="mt-6">
        <LoginForm />
      </div>
      <div className="flex justify-center gap-2 mt-6 text-gray-600 font-semibold text-sm">
        <Link href="/register/terms">회원가입</Link>|<p>아이디 찾기</p>|
        <p>비밀번호 찾기</p>
      </div>
      <div className="flex justify-center gap-2 mt-6 text-gray-600 text-sm items-center">
        <Separator className="bg-gray-600 flex-1" />
        <p className="flex-2">또는</p>
        <Separator className="bg-gray-600 flex-1" />
      </div>
      <div className="flex justify-center gap-16 mt-6">
        <Link href="https://boardbuddyapp.com/api/oauth2/authorization/naver">
          <Image
            src="/images/icon/naver_icon.png"
            alt="네이버 로그인"
            width={35}
            height={35}
            priority={true}
          />
        </Link>
        <Link href="https://boardbuddyapp.com/api/oauth2/authorization/kakao">
          <Image
            src="/images/icon/kakao_icon.png"
            alt="카카오 로그인"
            width={35}
            height={35}
            priority={true}
          />
        </Link>
        <Link href="https://boardbuddyapp.com/api/oauth2/authorization/google">
          <Image
            src="/images/icon/google_icon.png"
            alt="구글 로그인"
            width={35}
            height={35}
            priority={true}
          />
        </Link>
      </div>
    </>
  );
};

export default page;
