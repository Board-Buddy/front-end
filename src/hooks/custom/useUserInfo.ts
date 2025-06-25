'use client';

import { useQueryClient } from '@tanstack/react-query';
import { UserInfo } from '@/types/user';

export const useUserInfo = () => {
  const queryClient = useQueryClient();

  const userInfo = queryClient.getQueryData(['userInfo']) as UserInfo;

  return userInfo;
};
