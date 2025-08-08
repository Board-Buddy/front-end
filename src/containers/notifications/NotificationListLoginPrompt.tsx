import { Button } from '@/components/ui/button';
import AppLink from '@/components/AppLink';

const NotificationListLoginPrompt = () => {
  return (
    <div className="pt-12 text-center">
      <p className="mb-4 text-center font-semibold text-gray-800">
        로그인하시면 알림 기능을 이용하실 수 있어요
      </p>
      <AppLink href="/login-splash" replace>
        <Button className="h-8 w-28 rounded-3xl text-sm font-bold text-white">
          로그인하러 가기
        </Button>
      </AppLink>
    </div>
  );
};

export default NotificationListLoginPrompt;
