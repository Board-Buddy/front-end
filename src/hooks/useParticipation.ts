import {
  applyParticipation,
  approveParticipation,
  cancelParticipation,
  getParticipants,
  rejectParticipation,
} from '@/services/participation';
import { AxiosCustomError } from '@/types/api';
import { ParticipantInfo } from '@/types/article';
import { successToast } from '@/utils/customToast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetParticipationList = (articleId: number) => {
  return useQuery<ParticipantInfo[], AxiosCustomError>({
    queryKey: ['participation', { articleId }],
    queryFn: () => getParticipants({ articleId }),
    staleTime: 0,
    gcTime: 0,
  });
};

export const useApplyParticipation = (articleId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => applyParticipation({ articleId }),
    onSuccess: () => {
      // 성공 시 모집글 상세 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ['article', { articleId }],
      });
      successToast('apply', '참가 신청되었습니다.');
    },
  });
};

export const useCancelParticipation = (articleId: number) => {
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
      successToast('cancel', '참가 취소되었습니다.');
    },
  });
};

export const useApproveParticipation = (articleId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      participationId,
      applicantNickname,
    }: {
      participationId: number;
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

export const useRejectParticipation = (articleId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      participationId,
      applicantNickname,
    }: {
      participationId: number;
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
