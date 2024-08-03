import { getNotificationList } from '@/services/notification';
import { Notification } from '@/types/notification';
import { useQuery } from '@tanstack/react-query';

export const useGetNotificationList = () => {
  return useQuery<Notification[]>({
    queryKey: ['notifications'],
    queryFn: getNotificationList,
  });
};
