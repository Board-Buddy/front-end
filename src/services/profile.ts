import api from '@/services';
import { SuccessResponse } from '@/types/api';
import { Badge, Profile } from '@/types/profile';
import { JoinedArticle, MyArticle } from '@/types/article';
import { ENDPOINT } from './endpoint';

/** 프로필 조회 API */
export const getProfile = (nickname: string) =>
  api
    .get<SuccessResponse<{ profile: Profile }>>(ENDPOINT.USER.PROFILE(nickname))
    .then((response) => response.data.data.profile);

/** 프로필 수정 API */
export const editProfile = (editProfileDTO: FormData) =>
  api.put<SuccessResponse<null>>(ENDPOINT.MY.PROFILE.UPDATE(), editProfileDTO);

/** 뱃지 목록 조회 API */
export const getBadgeList = (nickname: string) =>
  api
    .get<SuccessResponse<{ badges: Badge[] }>>(`/badges/${nickname}`)
    .then((response) => response.data.data.badges);

/** 내가 작성한 모집글 조회 API */
export const getMyArticles = () =>
  api
    .get<SuccessResponse<{ posts: MyArticle[] }>>(ENDPOINT.MY.GATHER_ARTICLES())
    .then((response) => response.data.data.posts);

/** 내가 참가한 모집글 조회 API */
export const getJoinedArticles = () =>
  api
    .get<
      SuccessResponse<{ posts: JoinedArticle[] }>
    >(ENDPOINT.MY.JOINED_ARTICLES())
    .then((response) => response.data.data.posts);
