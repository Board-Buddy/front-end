import {
  editProfile,
  getBadgeList,
  getJoinedArticles,
  getMyArticles,
  getProfile,
} from '@/services/profile';
import { UserInfo } from '@/types/user';
import { blobToJson } from '@/utils/blobToJson';
import { successToast } from '@/utils/customToast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useGetProfile = (nickname: string) => {
  return useQuery({
    queryKey: ['profile', { nickname }],
    queryFn: () => getProfile(nickname),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useEditProfile = () => {
  const queryClient = useQueryClient();
  const userInfo = queryClient.getQueryData(['userInfo']);
  const { nickname } = userInfo as UserInfo;

  const router = useRouter();

  return useMutation({
    mutationFn: (data: FormData) => editProfile(data),
    onSuccess: async (_, variables) => {
      const updatedData = variables.get('UpdateProfileDTO') as File;
      const json = await blobToJson(updatedData);
      const newNickname = json.nickname;

      // 성공 시 userInfo 업데이트
      await queryClient.setQueryData(['userInfo'], (old: UserInfo) => {
        return {
          ...old,
          nickname: newNickname ?? old.nickname,
        };
      });

      queryClient.invalidateQueries({
        queryKey: ['profile', { nickname: newNickname ?? nickname }],
      });

      router.push('/my');
      successToast('profile update', '프로필이 수정되었습니다.');
    },
    retry: 0,
  });
};

export const useGetBadgeList = (nickname: string) => {
  return useQuery<{ badgeImageS3SavedURL: string; badgeYearMonth: string }[]>({
    queryKey: ['badgeList', { nickname }],
    queryFn: () => getBadgeList(nickname),
  });
};

export const useGetMyArticles = () => {
  return useQuery({
    queryKey: ['myArticles'],
    queryFn: () => getMyArticles(),
    staleTime: 0,
    gcTime: 0,
  });
};

export const useGetJoinedArticles = () => {
  return useQuery({
    queryKey: ['myJoinedArticles'],
    queryFn: () => getJoinedArticles(),
    staleTime: 0,
    gcTime: 0,
  });
};
