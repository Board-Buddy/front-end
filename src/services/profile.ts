import api from '@/services';

/** 프로필 조회 API */
export const getProfile = (nickname: string) =>
  api
    .get(`/v1/profiles/${nickname}`)
    .then((response) => response.data.data.profile);

/** 프로필 수정 API */
export const editProfile = (editProfileDTO: FormData) =>
  api.put(`/v1/profiles`, editProfileDTO);

/** 뱃지 목록 조회 API */
export const getBadgeList = (nickname: string) =>
  api
    .get(`/v1/badges/${nickname}`)
    .then((response) => response.data.data.badges);

/** 내가 작성한 모집글 조회 API */
export const getMyArticles = () =>
  api
    .get('/v1/my/gather-articles')
    .then((response) => response.data.data.posts);

/** 내가 참가한 모집글 조회 API */
export const getJoinedArticles = () =>
  api.get('/v1/my/participations').then((response) => response.data.data.posts);
