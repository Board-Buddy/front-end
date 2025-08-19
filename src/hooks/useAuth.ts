import { checkUserLogin, login, logout, withdrawal } from '@/services/auth';
import { successToast } from '@/utils/customToast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAppRouter from './custom/useAppRouter';
import { authQueryKeys } from '@/utils/queryKeys';
import { postRNMessage, STATE_KEYS } from '@/utils/webview';
import { MessageType } from '@/types/webview';
import { useUserInfoStore } from '@/store/userInfoStore';

export const useUserLoginCheck = ({ isReady }: { isReady: boolean }) => {
  return useQuery({
    queryKey: authQueryKeys.userInfo(),
    queryFn: checkUserLogin,
    enabled: isReady,
  });
};

export const useUserLogin = () => {
  const router = useAppRouter();
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo);

  return useMutation({
    mutationFn: (data: { username: string; password: string }) => login(data),
    onSuccess: async (data) => {
      const userInfo = data;

      setUserInfo(userInfo);

      postRNMessage(MessageType.SAVE_STATE, {
        key: STATE_KEYS.USER_INFO,
        state: userInfo,
      });

      router.replace({ href: '/home', screenName: 'HomeScreen' });
    },
    onError: async () => {
      postRNMessage(MessageType.SAVE_STATE, {
        key: STATE_KEYS.USER_INFO,
        state: null,
      });
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

      postRNMessage(MessageType.SAVE_STATE, {
        key: STATE_KEYS.USER_INFO,
        state: null,
      });

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
