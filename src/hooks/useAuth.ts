import { checkUserLogin, login, logout, withdrawal } from '@/services/auth';
import { successToast } from '@/utils/customToast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAppRouter from './custom/useAppRouter';
import { authQueryKeys } from '@/utils/queryKeys';
import { postRNMessage } from '@/utils/webview';
import { MessageType } from '@/types/webview';
import { UserInfo } from '@/types/user';
import { useRef } from 'react';

export const useSetUserInfo = () => {
  const queryClient = useQueryClient();
  const defaultsSet = useRef(false);

  const setUserInfo = (
    updater: (prev: UserInfo | null | undefined) => UserInfo | null | undefined,
  ) => {
    if (!defaultsSet.current) {
      queryClient.setQueryDefaults(authQueryKeys.userInfo(), {
        staleTime: Infinity,
        gcTime: Infinity,
      });

      defaultsSet.current = true;
    }

    queryClient.setQueryData<UserInfo | null>(authQueryKeys.userInfo(), (old) =>
      updater(old),
    );
  };

  return setUserInfo;
};

export const useUserLoginCheck = ({ isReady }: { isReady: boolean }) => {
  return useQuery({
    queryKey: authQueryKeys.userInfo(),
    queryFn: checkUserLogin,
    enabled: isReady,
  });
};

export const useUserLogin = () => {
  const router = useAppRouter();
  const setUserInfo = useSetUserInfo();

  return useMutation({
    mutationFn: (data: { username: string; password: string }) => login(data),
    onSuccess: async (data) => {
      const userInfo = data;

      setUserInfo(() => userInfo);

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
