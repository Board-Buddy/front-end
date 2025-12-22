'use client';

import { useGetNotificationList } from '@/hooks/useNotifications';
import NotificationItem from './NotificationItem';
import FallbackRender from '@/components/FallbackRender';
import EmptyFallback from '@/components/EmptyFallback';

const NotificationList = () => {
  const { data: notifications } = useGetNotificationList();

  return (
    <FallbackRender
      render={notifications.length === 0}
      component={<EmptyFallback message="모든 알림을 확인했어요🙂" />}
    >
      {notifications.map((notification) => (
        <NotificationItem
          key={`${notification.message}-${notification.createdAt}`}
          message={notification.message}
          createdAt={notification.createdAt}
        />
      ))}
    </FallbackRender>
  );
};

export default NotificationList;
