import { getBoardCafes } from '@/services/map';
import { Cafe } from '@/types/map';
import { useQuery } from '@tanstack/react-query';

export const useGetBoardCafes = ({
  x,
  y,
  radius,
}: {
  x: number;
  y: number;
  radius: number;
}) => {
  return useQuery<Cafe[]>({
    queryKey: ['cafe'],
    queryFn: () => getBoardCafes({ x, y, radius }),
    staleTime: 0,
    gcTime: 0,
    retry: 0,
  });
};
