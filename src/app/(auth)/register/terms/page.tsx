import TermForm from '@/containers/register/TermForm';
import Image from 'next/image';

const page = () => {
  return (
    <div className="w-full h-[calc(100vh-56px)]">
      <div className="pt-4 pb-8 px-8">
        <div>
          <Image
            src="/images/logo/boardbuddy_logo.png"
            width={70}
            height={35}
            alt="보드버디 로고"
            className="mb-4"
          />
          <span className="font-bold text-xl">약관동의</span>
          <p className="text-gray-600 font-semibold">
            필수항목 및 선택항목 약관에 동의해 주세요.
          </p>
        </div>
        <TermForm />
      </div>
    </div>
  );
};

export default page;
