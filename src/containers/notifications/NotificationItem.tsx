import { getLastMessageSentTime } from '@/utils/date';
import { BellIcon } from 'lucide-react';

interface Props {
  message: string;
  createdAt: string;
}

const NotificationItem = ({ message, createdAt }: Props) => {
  return (
    <div className="border-b border-slate-200 flex px-4 py-3 items-center">
      <div className="bg-gray-100 p-2 rounded-full border border-gray-200 mr-3">
        <BellIcon strokeWidth={1.5} />
      </div>
      <span className="font-semibold text-sm">{message}</span>
      <div className="text-xs self-start text-gray-500 min-w-12 ml-auto -translate-y-1 translate-x-2">
        {getLastMessageSentTime(createdAt)}
      </div>
    </div>
  );
};

export default NotificationItem;
