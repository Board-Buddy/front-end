'use client';

import { useGetNotificationList } from '@/hooks/useNotifications';
import Loading from '@/components/Loading';
import ErrorFallback from '@/components/ErrorFallback';
import NotificationItem from './NotificationItem';
import FallbackRender from '@/components/FallbackRender';
import EmptyFallback from '@/components/EmptyFallback';
import useAppRouter from '@/hooks/custom/useAppRouter';

const NotificationList = () => {
  const router = useAppRouter();
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
      router.push({ href: '/login/guide' });
    }

    return (
      <ErrorFallback reset={refetch} errMsg={error.response!.data.message} />
    );
  }

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
