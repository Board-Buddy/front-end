import api from '@/services';

/** 유저 위치 설정 API */
export const setLocation = ({ sido, sgg, emd }: { [key: string]: string }) =>
  api.post('/api/locations', { sido, sgg, emd });

/** 위치 반경 설정 API */
export const setRadius = ({ radius }: { radius: 2 | 5 | 7 | 10 }) =>
  api.post('/api/radius', { radius });

/** 위치 검색 API) */
export const searchLocation = (keyword: string, forAuth: boolean) => {
  return forAuth
    ? api
        .get(`/api/auth/locations/search?emd=${keyword}`)
        .then((response) => response.data.data.locations)
    : api
        .get(`/api/locations/search?emd=${keyword}`)
        .then((response) => response.data.data.locations);
};
