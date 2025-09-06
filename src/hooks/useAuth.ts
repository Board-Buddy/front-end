import { authQueryKeys } from './../utils/queryKeys';
import {
  checkUserLogin,
  getUserInfo,
  login,
  logout,
  withdrawal,
} from '@/services/auth';
import { successToast } from '@/utils/customToast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAppRouter from './custom/useAppRouter';
import { useSetUserInfo } from './custom/useSetUserInfo';
import handleApiError from '@/utils/handleApiError';

export const useUserLoginCheck = ({ isReady }: { isReady: boolean }) => {
  return useQuery({
    queryKey: ['userLoginCheck'], // TODO: 임시 쿼리 사용, 추후 삭제
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

      setUserInfo(userInfo);

      router.replace({ href: '/home', screenName: 'HomeScreen' });
    },
    onError: async (error) => {
      handleApiError(error);
      setUserInfo(null);
    },
  });
};

export const useUserInfo = ({ isReady }: { isReady: boolean }) => {
  return useQuery({
    queryKey: authQueryKeys.userInfo(),
    queryFn: getUserInfo,
    enabled: isReady,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useAppRouter();
  const setUserInfo = useSetUserInfo();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries();

      setUserInfo(null);

      router.replace({ href: '/home', screenName: 'HomeScreen' });

      successToast('logout', '로그아웃되었습니다.');
    },
  });
};

export const useWithdrawal = () => {
  const queryClient = useQueryClient();
  const router = useAppRouter();
  const setUserInfo = useSetUserInfo();

  return useMutation({
    mutationFn: withdrawal,
    onSuccess: () => {
      queryClient.removeQueries();

      setUserInfo(null);

      router.replace({ href: '/home', screenName: 'HomeScreen' });

      successToast('withdrawal', '탈퇴되었습니다.');
    },
  });
};
