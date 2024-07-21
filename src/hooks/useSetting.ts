import { setLocation, setRadius } from '@/services/setting';
import { UserInfo } from '@/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { sido: string; sigu: string; dong: string }) =>
      setLocation(data),
    onSuccess: (_, variables) => {
      console.log('here');
      queryClient.setQueryData(['userInfo'], (old: UserInfo) => {
        return {
          ...old,
          sido: variables.sido,
          sigu: variables.sigu,
          dong: variables.dong,
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
