import { checkUserLogin, login, logout, withdrawal } from '@/services/auth';
import { successToast } from '@/utils/customToast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAppRouter from './custom/useAppRouter';
import { authQueryKeys } from '@/utils/queryKeys';
import { postRNMessage } from '@/utils/webview';
import { MessageType } from '@/types/webview';

export const useUserLoginCheck = ({ isReady }: { isReady: boolean }) => {
  return useQuery({
    queryKey: authQueryKeys.userInfo(),
    queryFn: checkUserLogin,
    enabled: isReady,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const useUserLogin = () => {
  const queryClient = useQueryClient();
  const router = useAppRouter();

  return useMutation({
    mutationFn: (data: { username: string; password: string }) => login(data),
    onSuccess: async (data) => {
      const userInfo = data;

      await queryClient.prefetchQuery({
        queryKey: authQueryKeys.userInfo(),
        queryFn: () => Promise.resolve(userInfo),
        staleTime: Infinity,
        gcTime: Infinity,
      });

      postRNMessage(MessageType.LOGIN, userInfo);

      router.replace({ href: '/home', screenName: 'HomeScreen' });
    },
    onError: async () => {
      postRNMessage(MessageType.LOGIN, null);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useAppRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();

      postRNMessage(MessageType.LOGOUT);

      router.replace({ href: '/home', screenName: 'HomeScreen' });

      successToast('logout', '로그아웃되었습니다.');
    },
  });
};

export const useWithdrawal = () => {
  const queryClient = useQueryClient();
  const router = useAppRouter();

  return useMutation({
    mutationFn: withdrawal,
    onSuccess: () => {
      queryClient.removeQueries();

      router.replace({ href: '/home', screenName: 'HomeScreen' });

      successToast('withdrawal', '탈퇴되었습니다.');
    },
  });
};
