import AdditionalSettingForm from '@/containers/register/AdditionalSettingForm';

const page = () => {
  return (
    <>
      <div>
        <span className="font-bold text-xl">추가 정보 입력</span>
        <p className="text-gray-600 font-semibold">
          서비스를 이용하시려면 추가 정보 입력이 필요합니다.
        </p>
      </div>
      <div className="mt-6">
        <AdditionalSettingForm />
      </div>
    </>
  );
};

export default page;
