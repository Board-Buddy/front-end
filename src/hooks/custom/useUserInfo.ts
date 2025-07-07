'use client';

import { UserInfo } from '@/types/user';
import { useQueryClient } from '@tanstack/react-query';

export const useUserInfo = () => {
  const queryClient = useQueryClient();

  const userInfo = queryClient.getQueryData<UserInfo>(['userInfo']);

  return userInfo;
};
