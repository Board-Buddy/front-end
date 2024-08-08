import {
  getMyNeighborhoods,
  setLocation,
  setRadius,
} from '@/services/location';
import { UserInfo } from '@/types/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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

      queryClient.invalidateQueries({ queryKey: ['myNeighborhoods'] });
    },
  });
};

export const useSetRadius = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { radius: 2 | 5 | 7 | 10 }) => setRadius(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myNeighborhoods'] });
    },
  });
};

export const useGetMyNeighborhoods = () => {
  return useQuery({
    queryKey: ['myNeighborhoods'],
    queryFn: getMyNeighborhoods,
    staleTime: 0,
    gcTime: 0,
  });
};
