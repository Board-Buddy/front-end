import Link from 'next/link';
import { Button } from '@/components/ui/button';

const ChatListLoginPrompt = () => {
  return (
    <div className="pt-12 text-center">
      <p className="mb-4 text-center font-semibold text-gray-800">
        로그인하시면 채팅 기능을 이용하실 수 있어요
      </p>
      <Link href="/login-splash" replace>
        <Button className="h-8 w-28 rounded-3xl text-sm font-bold text-white">
          로그인하러 가기
        </Button>
      </Link>
    </div>
  );
};

export default ChatListLoginPrompt;
