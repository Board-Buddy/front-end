import {
  applyParticipation,
  approveParticipation,
  cancelParticipation,
  getParticipants,
  rejectParticipation,
} from '@/services/participation';
import { AxiosCustomError } from '@/types/api';
import { Article, ParticipantInfo } from '@/types/article';
import { Profile } from '@/types/profile';
import { UserInfo } from '@/types/user';
import { successToast } from '@/utils/customToast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetParticipationList = (articleId: Article['id']) => {
  return useQuery<ParticipantInfo[], AxiosCustomError>({
    queryKey: ['participation', { articleId }],
    queryFn: () => getParticipants({ articleId }),
    staleTime: 0,
    gcTime: 0,
  });
};

export const useApplyParticipation = (articleId: Article['id']) => {
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

export const useCancelParticipation = (articleId: Article['id']) => {
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

export const useApproveParticipation = (articleId: Article['id']) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      participationId,
      applicantNickname,
    }: {
      participationId: ParticipantInfo['id'];
      applicantNickname: UserInfo['nickname'];
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

export const useRejectParticipation = (articleId: Article['id']) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      participationId,
      applicantNickname,
    }: {
      participationId: ParticipantInfo['id'];
      applicantNickname: UserInfo['nickname'];
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
