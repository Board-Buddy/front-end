import { getRankings } from '@/services/ranking';
import { CustomAxiosError } from '@/types/api';
import { Ranking } from '@/types/ranking';
import { rankingQueryKeys } from '@/utils/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useGetRankings = () => {
  return useQuery<Ranking[], CustomAxiosError>({
    queryKey: rankingQueryKeys.all,
    queryFn: getRankings,
  });
};
