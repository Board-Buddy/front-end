import { searchLocation } from '@/services/location';
import { AxiosCustomError } from '@/types/api';
import { Location } from '@/types/location';
import { UserInfo } from '@/types/user';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useSearchLocation = (enabled: boolean, debouncedQuery: string) => {
  const cache = useQueryClient();
  const userInfo = cache.getQueryData(['userInfo']) as UserInfo | undefined;

  return useQuery<Location[], AxiosCustomError>({
    queryKey: ['search', debouncedQuery],
    queryFn: () => searchLocation(debouncedQuery, !userInfo),
    enabled,
    staleTime: 0,
    gcTime: 0,
    retry: 1,
  });
};
