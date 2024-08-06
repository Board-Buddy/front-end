import { getProfile } from '@/services/profile';
import { UserInfo } from '@/types/user';
import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetMyProfile = () => {
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData(['userInfo']) as UserInfo;
  const { nickname } = userInfo;

  return useQuery({
    queryKey: ['profile', { nickname }],
    queryFn: () => getProfile(nickname),
    staleTime: 0,
    gcTime: 0,
  });
};

export const useGetOtherUserProfile = (nickname: string) => {
  return useQuery({
    queryKey: ['profile', { nickname }],
    queryFn: () => getProfile(nickname),
    staleTime: 0,
    gcTime: 0,
  });
};
