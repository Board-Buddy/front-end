import TermForm from '@/containers/register/TermForm';

const page = () => {
  return (
    <>
      <div>
        <span className="font-bold text-xl">보드버디 회원가입</span>
        <p className="text-gray-600 font-semibold">
          서비스를 이용하려면 약관 동의가 필요합니다.
        </p>
      </div>
      <TermForm />
    </>
  );
};

export default page;
