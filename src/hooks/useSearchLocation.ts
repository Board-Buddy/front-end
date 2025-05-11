import { searchLocation } from '@/services/location';
import { AxiosCustomError } from '@/types/api';
import { Location } from '@/types/location';
import { getUserInfo } from '@/utils/userInfoStorage';
import { useQuery } from '@tanstack/react-query';

export const useSearchLocation = (enabled: boolean, debouncedQuery: string) => {
  const userInfo = getUserInfo();

  return useQuery<Location[], AxiosCustomError>({
    queryKey: ['search', debouncedQuery],
    queryFn: () => searchLocation(debouncedQuery, !userInfo),
    enabled,
    staleTime: 0,
    gcTime: 0,
    retry: 1,
  });
};
