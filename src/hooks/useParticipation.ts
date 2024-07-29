import { getParticipants } from '@/services/participation';
import { ParticipantInfo } from '@/types/article';
import { useQuery } from '@tanstack/react-query';

export const useGetParticipationList = (articleId: string) => {
  return useQuery<ParticipantInfo[]>({
    queryKey: ['participation', { articleId }],
    queryFn: () => getParticipants({ articleId }),
    staleTime: 0,
    gcTime: 0,
  });
};
