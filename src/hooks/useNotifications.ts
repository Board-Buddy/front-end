import { getNotificationList } from '@/services/notification';
import { CustomAxiosError } from '@/types/api';
import { Notification } from '@/types/notification';
import { notificationQueryKeys } from '@/utils/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useGetNotificationList = () => {
  return useQuery<Notification[], CustomAxiosError>({
    queryKey: notificationQueryKeys.list(),
    queryFn: getNotificationList,
    staleTime: 1 * 1000,
    gcTime: 10 * 1000,
  });
};
