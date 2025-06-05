import { getNotificationList } from '@/services/notification';
import { CustomAxiosError } from '@/types/api';
import { Notification } from '@/types/notification';
import { useQuery } from '@tanstack/react-query';

export const useGetNotificationList = () => {
  return useQuery<Notification[], CustomAxiosError>({
    queryKey: ['notifications'],
    queryFn: getNotificationList,
    staleTime: 1 * 1000,
    gcTime: 10 * 1000,
  });
};
