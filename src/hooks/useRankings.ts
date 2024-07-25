import { getRankings } from '@/services/ranking';
import { Ranking } from '@/types/ranking';
import { getCurrentYearAndMonth } from '@/utils/date';
import { useQuery } from '@tanstack/react-query';

export const useGetRankings = () => {
  const month = getCurrentYearAndMonth();

  return useQuery<Ranking[]>({
    queryKey: ['ranking', month],
    queryFn: getRankings,
  });
};
