import api from '@/services';
import { SuccessResponse } from '@/types/api';
import { Location, MyNeighborhoods } from '@/types/location';
import { ENDPOINT } from './endpoint';

/** 내 동네 조회 API */
export const getMyNeighborhoods = () =>
  api
    .get<SuccessResponse<MyNeighborhoods>>(ENDPOINT.MY.NEIGHBORHOODS())
    .then((response) => response.data.data);

/** 내 동네 설정 설정 API */
export const setLocation = ({ sido, sgg, emd }: { [key: string]: string }) =>
  api.put<SuccessResponse<MyNeighborhoods>>(ENDPOINT.MY.NEIGHBORHOODS(), {
    sido,
    sgg,
    emd,
  });

/** 내 반경 설정 API */
export const setRadius = ({ radius }: { radius: 2 | 5 | 7 | 10 }) =>
  api.put<SuccessResponse<null>>(ENDPOINT.MY.RADIUS(), { radius });

/** 위치 검색 API */
export const searchLocation = (keyword: string, forSignUp: boolean) => {
  return forSignUp
    ? api
        .get<
          SuccessResponse<{ locations: Location[] }>
        >(ENDPOINT.LOCATION.SEARCH_FOR_SIGNUP(keyword))
        .then((response) => response.data.data.locations)
    : api
        .get<
          SuccessResponse<{ locations: Location[] }>
        >(ENDPOINT.LOCATION.SEARCH_BY_USER(keyword))
        .then((response) => response.data.data.locations);
};
