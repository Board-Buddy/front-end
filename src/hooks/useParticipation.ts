import {
  applyParticipation,
  approveParticipation,
  cancelParticipation,
  getParticipants,
  rejectParticipation,
} from '@/services/participation';
import { CustomAxiosError } from '@/types/api';
import { Article, ParticipantInfo } from '@/types/article';
import { UserInfo } from '@/types/user';
import { successToast } from '@/utils/customToast';
import { articleQueryKeys, myQueryKeys } from '@/utils/queryKeys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetParticipationList = (articleId: Article['id']) => {
  return useQuery<ParticipantInfo[], CustomAxiosError>({
    queryKey: articleQueryKeys.participationList(articleId),
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
      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.detail(articleId),
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
      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.detail(articleId),
      });

      queryClient.invalidateQueries({
        queryKey: myQueryKeys.joinedArticle(),
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
      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.participationList(articleId),
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
      queryClient.invalidateQueries({
        queryKey: articleQueryKeys.participationList(articleId),
      });
    },
  });
};
