import { Notification } from '@/types/notification';
import { getLastMessageSentTime } from '@/utils/date';
import { BellIcon } from 'lucide-react';

const NotificationItem = ({ message, createdAt }: Notification) => {
  return (
    <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3">
      <div className="rounded-full border border-gray-200 bg-gray-100 p-2">
        <BellIcon strokeWidth={1.5} />
      </div>
      <span className="text-sm font-semibold">{message}</span>
      <div className="ml-auto min-w-fit self-start text-right text-xs text-gray-500">
        {getLastMessageSentTime(createdAt)}
      </div>
    </div>
  );
};

export default NotificationItem;
