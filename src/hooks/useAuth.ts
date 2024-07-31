import { checkUserLogin, login } from '@/services/auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useUserLoginCheck = ({ isReady }: { isReady: boolean }) => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: checkUserLogin,
    enabled: isReady,
    meta: {
      showErrorMessage: true,
    },
  });
};

export const useUserLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: { username: string; password: string }) => login(data),
    onSuccess: (data) => {
      const userInfo = data;
      queryClient.setQueryData(['userInfo'], userInfo);
      router.push('/home');
    },
    meta: {
      showErrorMessage: true,
    },
  });
};
