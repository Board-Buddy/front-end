'use client';

import { useUserLogin } from '@/hooks/useAuth';

const Example = () => {
  // react-query 사용 예시
  // TODO 로그인 상태라면 홈 페이지로 넘어가도록 해둠. 추후 수정 예정
  const { mutate: login, isPending } = useUserLogin();

  const onClick = () => {
    login({
      username: 'kong',
      password: 'password',
    });
  };

  if (isPending) return <div>loading...</div>;

  return (
    <>
      <button type="button" onClick={onClick}>
        로그인 버튼
      </button>
    </>
  );
};

export default Example;
