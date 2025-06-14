import { Bell } from 'lucide-react';
import Link from 'next/link';

const NotificationButton = () => {
  return (
    <Link
      href="/notifications"
      className="absolute right-[30px] top-[30px] z-50"
    >
      <div className="rounded-lg bg-white p-2">
        <Bell size={20} className="text-gray-400" fill="#94a3b8" />
      </div>
    </Link>
  );
};

export default NotificationButton;
