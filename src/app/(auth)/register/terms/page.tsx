import TermForm from '@/containers/register/TermForm';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

const page = () => {
  notFound();

  return (
    <div className="h-[calc(100vh-56px)] w-full">
      <div className="px-8 pb-8 pt-4">
        <div>
          <Image
            src="/images/logo/boardbuddy_logo.png"
            width={70}
            height={35}
            alt="보드버디 로고"
            className="mb-4"
          />
          <span className="text-xl font-bold">약관동의</span>
          <p className="font-semibold text-gray-600">
            필수항목 및 선택항목 약관에 동의해 주세요.
          </p>
        </div>
        <Suspense>
          <TermForm />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
