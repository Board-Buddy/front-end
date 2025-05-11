import { checkUserLogin, login, logout, withdrawal } from '@/services/auth';
import { UserInfo } from '@/types/user';
import { successToast } from '@/utils/customToast';
import { localStorageUtil } from '@/utils/localStorageUtil';
import { setUserInfo } from '@/utils/userInfoStorage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useUserLoginCheck = ({ isReady }: { isReady: boolean }) => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: checkUserLogin,
    enabled: isReady,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

export const useUserLogin = () => {
  const router = useRouter();

  return useMutation<UserInfo, Error, { username: string; password: string }>({
    mutationFn: (data: { username: string; password: string }) => login(data),
    onSuccess: async (data) => {
      const userInfo = data;
      setUserInfo(userInfo);

      router.push('/home');
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries();
      localStorageUtil.clear();

      router.push('/');
      successToast('logout', '로그아웃되었습니다.');
    },
  });
};

export const useWithdrawal = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: withdrawal,
    onSuccess: () => {
      queryClient.invalidateQueries();
      localStorageUtil.clear();

      router.push('/');
      successToast('withdrawal', '탈퇴되었습니다.');
    },
  });
};
