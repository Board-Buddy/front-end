import RegisterForm from '@/containers/register/RegisterForm';
import Image from 'next/image';

const page = () => {
  return (
    <div className="w-full h-[calc(100vh-56px)] overflow-y-scroll">
      <div className="pt-4 pb-8 px-8">
        <div>
          <Image
            src="/images/logo/boardbuddy_logo.png"
            width={70}
            height={35}
            alt="보드버디 로고"
            className="mb-4"
          />
          <span className="font-bold text-xl">계정 정보 입력</span>
          <p className="text-gray-600 font-semibold">
            회원가입에 필요한 정보를 입력해주세요.
          </p>
        </div>
        <div className="mt-6">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default page;
