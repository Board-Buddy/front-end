import {
  applyParticipation,
  approveParticipation,
  cancelParticipation,
  getParticipants,
  rejectParticipation,
} from '@/services/participation';
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

export const useApplyParticipation = (articleId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => applyParticipation({ articleId }),
    onSuccess: () => {
      // 성공 시 모집글 상세 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ['article', { articleId }],
      });
    },
  });
};

export const useCancelParticipation = (articleId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => cancelParticipation({ articleId }),
    onSuccess: () => {
      // 성공 시 모집글 상세 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ['article', { articleId }],
      });
      // TODO 쿼리 무효화 되는지 확인
      queryClient.invalidateQueries({
        queryKey: ['myJoinedArticles'],
      });
    },
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
    }) =>
      approveParticipation({ articleId, participationId, applicantNickname }),
    onSuccess: () => {
      // 성공 시 참가 신청 목록 리스트 무효화
      queryClient.invalidateQueries({
        queryKey: ['participation', { articleId }],
      });
    },
  });
};

export const useRejectParticipation = (articleId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      participationId,
      applicantNickname,
    }: {
      participationId: string;
      applicantNickname: string;
    }) =>
      rejectParticipation({ articleId, participationId, applicantNickname }),
    onSuccess: () => {
      // 성공 시 참가 신청 목록 리스트 무효화
      queryClient.invalidateQueries({
        queryKey: ['participation', { articleId }],
      });
    },
  });
};
