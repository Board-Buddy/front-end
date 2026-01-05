import { getRankings } from '@/services/ranking';
import { rankingQueryKeys } from '@/utils/queryKeys';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

export const getRankingsOptions = () =>
  queryOptions({
    queryKey: rankingQueryKeys.all,
    queryFn: getRankings,
  });

export const useGetRankings = () => {
  return useSuspenseQuery(getRankingsOptions());
};
