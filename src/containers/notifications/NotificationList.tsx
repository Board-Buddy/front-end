'use client';

import { useGetNotificationList } from '@/hooks/useNotifications';
import Loading from '@/components/Loading';
import ErrorFallback from '@/components/ErrorFallback';
import NotificationItem from './NotificationItem';

const NotificationList = () => {
  const {
    data: notifications,
    isPending,
    isError,
    error,
    refetch,
  } = useGetNotificationList();

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return (
      <ErrorFallback errMsg={error.response?.data.message} reset={refetch} />
    );
  }

  return (
    <>
      {notifications.map((notification, i) => (
        <NotificationItem
          key={i}
          message={notification.message}
          createdAt={notification.createdAt}
        />
      ))}
    </>
  );
};

export default NotificationList;
