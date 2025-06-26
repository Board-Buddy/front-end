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
    if (error.response?.status === 401) {
      throw error;
    }

    return (
      <ErrorFallback reset={refetch} errMsg={error.response!.data.message} />
    );
  }

  return (
    <>
      {notifications.map((notification) => (
        <NotificationItem
          key={`${notification.message}-${notification.createdAt}`}
          message={notification.message}
          createdAt={notification.createdAt}
        />
      ))}
    </>
  );
};

export default NotificationList;
