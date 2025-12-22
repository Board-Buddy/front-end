import { getNotificationList } from '@/services/notification';
import { notificationQueryKeys } from '@/utils/queryKeys';
import { useSuspenseQuery } from '@tanstack/react-query';

export const getNotificationListOptions = () => ({
  queryKey: notificationQueryKeys.list(),
  queryFn: getNotificationList,
  staleTime: 1 * 1000,
  gcTime: 10 * 1000,
});

export const useGetNotificationList = () =>
  useSuspenseQuery(getNotificationListOptions());
