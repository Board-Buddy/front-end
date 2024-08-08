import { getNotificationList } from '@/services/notification';
import { CustomError } from '@/types/api';
import { Notification } from '@/types/notification';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useGetNotificationList = () => {
  return useQuery<Notification[], AxiosError<CustomError>>({
    queryKey: ['notifications'],
    queryFn: getNotificationList,
    staleTime: 1 * 1000,
    gcTime: 10 * 1000,
  });
};
