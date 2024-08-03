'use client';

import NotificationItem from '@/containers/notifications/NotificationItem';
import { useGetNotificationList } from '@/hooks/useNotifications';

const Page = () => {
  const {
    data: notifications,
    isPending,
    isError,
    error,
  } = useGetNotificationList();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {notifications.map((notification, i) => (
        <NotificationItem
          key={i}
          message={notification.message}
          createdAt={notification.createdAt}
        />
      ))}
    </div>
  );
};

export default Page;
