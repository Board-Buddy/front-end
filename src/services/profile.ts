import api from '@/services';

/** 프로필 조회 API */
export const getProfile = (nickname: string) =>
  api
    .get(`/api/profiles/${nickname}`)
    .then((response) => response.data.data.profile);

/** 프로필 수정 API */
export const editProfile = (editProfileDTO: FormData) =>
  api.put(`/api/profiles`, editProfileDTO);

/** 뱃지 목록 조회 */
export const getBadgeList = (nickname: string) =>
  api
    .get(`/api/badges/${nickname}`)
    .then((response) => response.data.data.badges);
