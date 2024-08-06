import { editProfile } from '@/services/profile';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

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
