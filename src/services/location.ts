import api from '@/services';

/** 내 동네 조회 API */
export const getMyNeighborhoods = () =>
  api.get('/v1/my/neighborhoods').then((response) => response.data.data);

/** 내 동네 설정 설정 API */
export const setLocation = ({ sido, sgg, emd }: { [key: string]: string }) =>
  api.put('/v1/my/neighborhoods', { sido, sgg, emd });

/** 내 반경 설정 API */
export const setRadius = ({ radius }: { radius: 2 | 5 | 7 | 10 }) =>
  api.put('/v1/my/radius', { radius });

/** 위치 검색 API */
export const searchLocation = (keyword: string, forAuth: boolean) => {
  return forAuth
    ? api
        .get(`/v1/auth/locations/search?emd=${keyword}`)
        .then((response) => response.data.data.locations)
    : api
        .get(`/v1/locations/search?emd=${keyword}`)
        .then((response) => response.data.data.locations);
};
