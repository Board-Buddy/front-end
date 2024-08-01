import { searchLocation } from '@/services/location';
import { CustomError } from '@/types/api';
import { Location } from '@/types/location';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useSearchLocation = (enabled: boolean, debouncedQuery: string) => {
  return useQuery<Location[], AxiosError<CustomError>>({
    queryKey: ['search', debouncedQuery],
    queryFn: () => searchLocation(debouncedQuery),
    enabled,
    retry: 1,
  });
};
