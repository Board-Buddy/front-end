'use client';

import { UserInfo } from '@/types/user';
import { authQueryKeys } from '@/utils/queryKeys';
import { useQueryClient } from '@tanstack/react-query';

export const useUserInfo = () => {
  const queryClient = useQueryClient();

  const userInfo = queryClient.getQueryData<UserInfo>(authQueryKeys.userInfo());

  return userInfo;
};
