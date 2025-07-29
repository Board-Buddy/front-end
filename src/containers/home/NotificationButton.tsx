import AppLink from '@/components/AppLink';
import { Bell } from 'lucide-react';

const NotificationButton = () => {
  return (
    <AppLink
      href="/notifications"
      className="absolute right-[30px] top-[30px] z-50"
      headerTitle="알림"
    >
      <div className="rounded-lg bg-white p-2">
        <Bell size={20} className="text-gray-400" fill="#94a3b8" />
      </div>
    </AppLink>
  );
};

export default NotificationButton;
