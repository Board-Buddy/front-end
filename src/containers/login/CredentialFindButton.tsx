'use client';

import { Button } from '@/components/ui/button';
import { infoToast } from '@/utils/customToast';

interface Props {
  title: string;
}

// 아이디 찾기, 비밀번호 찾기 버튼 공용 컴포넌트
// 기능 구현 후 제거
const CredentialFindButton = ({ title }: Props) => {
  const handleClick = () => infoToast('prepare', '🚧 준비 중인 기능입니다.');

  return (
    <Button
      onClick={handleClick}
      className="bg-transparent p-0 text-sm font-semibold text-gray-600"
    >
      {title} 찾기
    </Button>
  );
};

export default CredentialFindButton;
