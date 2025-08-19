import {
  editProfile,
  getBadgeList,
  getJoinedArticles,
  getMyArticles,
  getProfile,
} from '@/services/profile';
import { CustomAxiosError } from '@/types/api';
import { JoinedArticle, MyArticle } from '@/types/article';
import { Badge, Profile } from '@/types/profile';
import { blobToJson } from '@/utils/blobToJson';
import { successToast } from '@/utils/customToast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAppRouter from './custom/useAppRouter';
import { myQueryKeys, profileQueryKeys } from '@/utils/queryKeys';
import { useUserInfoSelector } from '@/store/userInfoStore';
import { useSetUserInfo } from './custom/useSetUserInfo';

export const useGetProfile = (nickname: string) => {
  return useQuery<Profile, CustomAxiosError>({
    queryKey: profileQueryKeys.userProfile(nickname),
    queryFn: () => getProfile(nickname),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useEditProfile = () => {
  const queryClient = useQueryClient();

  const setUserInfo = useSetUserInfo();

  const userInfo = useUserInfoSelector();
  const previousNickname = userInfo?.nickname;

  const router = useAppRouter();

  return useMutation({
    mutationFn: (data: FormData) => editProfile(data),
    onSuccess: async (_, variables) => {
      const updatedData = variables.get('UpdateProfileDTO') as File;
      const json = await blobToJson(updatedData);
      const newNickname = json.nickname;

      if (newNickname) {
        setUserInfo({ nickname: newNickname ?? previousNickname });
      }

      queryClient.invalidateQueries({
        queryKey: profileQueryKeys.userProfile(newNickname ?? previousNickname),
      });

      successToast('profile update', '프로필이 수정되었습니다.');
      router.replace({ href: '/my', screenName: 'MyPageScreen' });
    },
    retry: 0,
  });
};

export const useGetBadgeList = (nickname: string) => {
  return useQuery<Badge[], CustomAxiosError>({
    queryKey: profileQueryKeys.badgeList(nickname),
    queryFn: () => getBadgeList(nickname),
  });
};

export const useGetMyArticles = () => {
  return useQuery<MyArticle[], CustomAxiosError>({
    queryKey: myQueryKeys.postedArticle(),
    queryFn: () => getMyArticles(),
    staleTime: 0,
    gcTime: 0,
  });
};

export const useGetJoinedArticles = () => {
  return useQuery<JoinedArticle[], CustomAxiosError>({
    queryKey: myQueryKeys.joinedArticle(),
    queryFn: () => getJoinedArticles(),
    staleTime: 0,
    gcTime: 0,
  });
};
