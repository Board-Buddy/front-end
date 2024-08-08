import { getRankings } from '@/services/ranking';
import { Ranking } from '@/types/ranking';
import { useQuery } from '@tanstack/react-query';

export const useGetRankings = () => {
  return useQuery<Ranking[]>({
    queryKey: ['ranking'],
    queryFn: getRankings,
  });
};
