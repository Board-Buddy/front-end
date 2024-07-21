import RegisterForm from '@/containers/register/RegisterForm';

const page = () => {
  return (
    <>
      <div>
        <span className="font-bold text-xl">계정 정보 입력</span>
        <p className="text-gray-600 font-semibold">
          회원가입에 필요한 정보를 입력해주세요.
        </p>
      </div>
      <div className="my-4">
        <RegisterForm />
      </div>
    </>
  );
};

export default page;
