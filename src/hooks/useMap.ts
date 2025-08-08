import { getBoardCafes } from '@/services/map';
import { Cafe } from '@/types/map';
import { boardCafeQueryKeys } from '@/utils/queryKeys';
import { useQuery } from '@tanstack/react-query';

/** 보드게임 카페 조회 query
 * @param x 경도
 * @param y 위도
 */
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
    queryKey: boardCafeQueryKeys.all,
    queryFn: () => getBoardCafes({ x, y, radius }),
    staleTime: 0,
    gcTime: 0,
    retry: 1,
  });
};
