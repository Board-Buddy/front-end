import api from '@/services';
import { UserInfo } from '@/types/user';
import { useQueryClient } from '@tanstack/react-query';

/** 프로필 조회 API */
export const getProfile = (nickname: string) =>
  api
    .get(`/api/profiles/${nickname}`)
    .then((response) => response.data.data.profile);
