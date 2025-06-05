import { getRankings } from '@/services/ranking';
import { CustomAxiosError } from '@/types/api';
import { Ranking } from '@/types/ranking';
import { useQuery } from '@tanstack/react-query';

export const useGetRankings = () => {
  return useQuery<Ranking[], CustomAxiosError>({
    queryKey: ['ranking'],
    queryFn: getRankings,
  });
};
