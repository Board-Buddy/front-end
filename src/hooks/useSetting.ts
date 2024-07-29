import { setLocation, setRadius } from '@/services/setting';
import { UserInfo } from '@/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { sido: string; sgg: string; emd: string }) =>
      setLocation(data),
    onSuccess: (_, variables) => {
      console.log('here');
      queryClient.setQueryData(['userInfo'], (old: UserInfo) => {
        return {
          ...old,
          sido: variables.sido,
          sgg: variables.sgg,
          emd: variables.emd,
        };
      });
    },
  });
};

export const useRadius = () => {
  return useMutation({
    mutationFn: (data: { radius: 2 | 5 | 7 | 10 }) => setRadius(data),
  });
};
