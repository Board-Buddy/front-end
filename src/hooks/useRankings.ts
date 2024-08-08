import { getRankings } from '@/services/ranking';
import { AxiosCustomError } from '@/types/api';
import { Ranking } from '@/types/ranking';
import { useQuery } from '@tanstack/react-query';

export const useGetRankings = () => {
  return useQuery<Ranking[], AxiosCustomError>({
    queryKey: ['ranking'],
    queryFn: getRankings,
  });
};
