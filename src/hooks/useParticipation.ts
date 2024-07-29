import { approveParticipant, getParticipants } from '@/services/participation';
import { ParticipantInfo } from '@/types/article';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetParticipationList = (articleId: string) => {
  return useQuery<ParticipantInfo[]>({
    queryKey: ['participation', { articleId }],
    queryFn: () => getParticipants({ articleId }),
    staleTime: 0,
    gcTime: 0,
  });
};

export const useApproveParticipation = (articleId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      participationId,
      applicantNickname,
    }: {
      participationId: string;
      applicantNickname: string;
    }) => approveParticipant({ articleId, participationId, applicantNickname }),
    onSuccess: () => {
      // 성공 시 참가 신청 목록 리스트 무효화
      queryClient.invalidateQueries({
        queryKey: ['participation', { articleId }],
      });
    },
  });
};
