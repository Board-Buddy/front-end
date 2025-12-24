import MyActivity from '@/containers/my/MyActivity';

// NOTE: 서버 측에서 닉네임에 접근할 수 없으므로 prefetch 불가
const page = () => {
  return (
    <div className="p-4">
      <MyActivity />
    </div>
  );
};

export default page;
