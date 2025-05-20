import { getReviewList, sendReview } from '@/services/review';
import { AxiosCustomError } from '@/types/api';
import { Review } from '@/types/review';
import { successToast } from '@/utils/customToast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';

export const useGetReviewList = (articleId: number) => {
  return useQuery<Review[], AxiosCustomError>({
    queryKey: ['reviewList', { articleId }],
    queryFn: () => getReviewList(articleId),
    staleTime: 0,
    gcTime: 0,
  });
};

export const useSendReview = (
  articleId: number,
  nickname: string,
  setOpen: Dispatch<SetStateAction<boolean>>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ review }: { review: string }) =>
      sendReview(articleId, nickname, review),
    onSuccess: () => {
      // 모달 닫기
      setOpen(false);
      successToast('sendReview', '후기가 전송되었습니다.');
      // after send review, refresh review list
      queryClient.invalidateQueries({
        queryKey: ['reviewList', { articleId }],
      });
    },
  });
};
