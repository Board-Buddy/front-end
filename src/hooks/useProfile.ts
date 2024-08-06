import { editProfile, getProfile } from '@/services/profile';
import { UserInfo } from '@/types/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

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

export const useEditProfile = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: FormData) => editProfile(data),
    onSuccess: () => {
      router.push('/my');
      // 성공 시 userInfo 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ['userInfo'],
      });
    },
    retry: 0,
  });
};
