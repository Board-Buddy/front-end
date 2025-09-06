import RegisterForm from '@/containers/register/RegisterForm';
import Image from 'next/image';
import Logo from '@images/logo/boardbuddy_logo.png';

const page = () => {
  return (
    <div className="h-[calc(100vh-56px)] w-full overflow-y-scroll">
      <div className="px-8 pb-8 pt-4">
        <div>
          <Image
            src={Logo}
            width={70}
            height={35}
            alt="보드버디 로고"
            className="mb-4"
          />
          <span className="text-xl font-bold">계정 정보 입력</span>
          <p className="font-semibold text-gray-600">
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
