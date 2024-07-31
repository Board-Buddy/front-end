import { setLocation, setRadius } from '@/services/location';
import { UserInfo } from '@/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSetLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { sido: string; sgg: string; emd: string }) =>
      setLocation(data),
    onSuccess: (_, variables) => {
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

export const useSetRadius = () => {
  return useMutation({
    mutationFn: (data: { radius: 2 | 5 | 7 | 10 }) => setRadius(data),
  });
};
