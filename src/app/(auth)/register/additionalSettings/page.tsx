import AdditionalSettingForm from '@/containers/register/AdditionalSettingForm';
import Image from 'next/image';

const page = () => {
  return (
    <div className="w-full h-[calc(100vh-56px)] overflow-y-scroll">
      <div className="pt-4 pb-8 px-8">
        <div>
          <Image
            src="/images/logo/boardbuddy_logo.png"
            width={70}
            height={70}
            alt="보드버디 로고"
            className="mb-4"
          />
          <span className="font-bold text-xl">추가 정보 입력</span>
          <p className="text-gray-600 font-semibold">
            서비스를 이용하시려면 추가 정보 입력이 필요합니다.
          </p>
        </div>
        <div className="mt-6">
          <AdditionalSettingForm />
        </div>
      </div>
    </div>
  );
};

export default page;
