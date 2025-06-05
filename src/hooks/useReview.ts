import { getReviewList, sendReview } from '@/services/review';
import { CustomAxiosError } from '@/types/api';
import { Article } from '@/types/article';
import { Review } from '@/types/review';
import { successToast } from '@/utils/customToast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

export const useGetReviewList = (articleId: Article['id']) => {
  return useQuery<Review[], CustomAxiosError>({
    queryKey: ['reviewList', { articleId }],
    queryFn: () => getReviewList(articleId),
    staleTime: 0,
    gcTime: 0,
  });
};

export const useSendReview = (
  articleId: Article['id'],
  nickname: Review['nickname'],
  setOpen: Dispatch<SetStateAction<boolean>>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ review }: { review: string }) =>
      sendReview(articleId, nickname, review),
    onSuccess: () => {
      setOpen(false);
      successToast('sendReview', '후기가 전송되었습니다.');

      queryClient.invalidateQueries({
        queryKey: ['reviewList', { articleId }],
      });
    },
  });
};
