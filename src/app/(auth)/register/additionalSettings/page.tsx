import AdditionalSettingForm from '@/containers/register/AdditionalSettingForm';
import Image from 'next/image';
import { Suspense } from 'react';

const page = () => {
  return (
    <div className="h-[calc(100vh-56px)] w-full overflow-y-scroll">
      <div className="px-8 pb-8 pt-4">
        <div>
          <Image
            src="/images/logo/boardbuddy_logo.png"
            width={70}
            height={35}
            alt="보드버디 로고"
            className="mb-4"
          />
          <span className="text-xl font-bold">추가 정보 입력</span>
          <p className="font-semibold text-gray-600">
            서비스를 이용하시려면 휴대폰 인증이 필요합니다.
          </p>
        </div>
        <Suspense>
          <div className="mt-6">
            <AdditionalSettingForm />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default page;
