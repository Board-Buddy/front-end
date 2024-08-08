import { getNotificationList } from '@/services/notification';
import { AxiosCustomError } from '@/types/api';
import { Notification } from '@/types/notification';
import { useQuery } from '@tanstack/react-query';

export const useGetNotificationList = () => {
  return useQuery<Notification[], AxiosCustomError>({
    queryKey: ['notifications'],
    queryFn: getNotificationList,
    staleTime: 1 * 1000,
    gcTime: 10 * 1000,
  });
};
