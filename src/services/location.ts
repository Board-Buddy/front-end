import api from '@/services';
import { ENDPOINT } from './endpoint';

/** 내 동네 조회 API */
export const getMyNeighborhoods = () =>
  api.get(ENDPOINT.MY.NEIGHBORHOODS()).then((response) => response.data.data);

/** 내 동네 설정 설정 API */
export const setLocation = ({ sido, sgg, emd }: { [key: string]: string }) =>
  api.put(ENDPOINT.MY.NEIGHBORHOODS(), { sido, sgg, emd });

/** 내 반경 설정 API */
export const setRadius = ({ radius }: { radius: 2 | 5 | 7 | 10 }) =>
  api.put(ENDPOINT.MY.RADIUS(), { radius });

/** 위치 검색 API */
export const searchLocation = (keyword: string, forSignUp: boolean) => {
  return forSignUp
    ? api
        .get(ENDPOINT.LOCATION.SEARCH_FOR_SIGNUP(keyword))
        .then((response) => response.data.data.locations)
    : api
        .get(ENDPOINT.LOCATION.SEARCH_BY_USER(keyword))
        .then((response) => response.data.data.locations);
};
