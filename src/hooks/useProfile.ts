import { getProfile } from '@/services/profile';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetProfile = (nickname: string) => {
  return useSuspenseQuery({
    queryKey: ['profile', { nickname }],
    queryFn: () => getProfile(nickname),
    staleTime: 0,
    gcTime: 0,
  });
};
