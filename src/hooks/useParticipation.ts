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
    meta: {
      showErrorMessage: true,
    },
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
    meta: {
      showErrorMessage: true,
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
    },
    meta: {
      showErrorMessage: true,
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
    meta: {
      showErrorMessage: true,
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
