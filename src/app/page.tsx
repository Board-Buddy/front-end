import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const page = () => {
  return (
    <div className="min-h-screen bg-secondary flex flex-col items-center justify-center">
      <Image
        src="/images/logo/boardbuddy_logo.png"
        alt="보드버디 로고"
        width={216}
        height={108}
        className="mb-32"
        priority={true}
      />
      <Link href="/register/terms">
        <Button className="rounded-3xl text-white font-bold py-6 w-64 text-md">
          보드버디 참여하기
        </Button>
      </Link>

      <div className="flex gap-1 mt-2 text-white font-semibold text-sm">
        <p>이미 보드버디 회원이라면?</p>
        <Link href="/login">
          <span className="underline cursor-pointer">로그인</span>
        </Link>
      </div>
    </div>
  );
};

export default page;
