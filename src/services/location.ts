import api from '@/services';

/** 유저 위치 설정 API */
export const setLocation = ({ sido, sgg, emd }: { [key: string]: string }) =>
  api.post('/api/locations', { sido, sgg, emd });

/** 위치 반경 설정 API */
export const setRadius = ({ radius }: { radius: 2 | 5 | 7 | 10 }) =>
  api.post('/api/radius', { radius });

/** 위치 검색 API */
export const searchLocation = async (keyword: string) => {
  try {
    const uri = encodeURI(
      `/api/locations/search?emd=${encodeURIComponent(keyword)}`,
    );
    const response = await api.get(uri).then((res) => res.data.data.locations);
    return response;
  } catch (error: any) {
    if (error.response) {
      throw Object.assign(new Error(), {
        status: error.response.status,
        message: error.response.data.message || 'Something went wrong',
        data: error.response.data,
      });
    } else {
      throw Object.assign(new Error(), {
        status: 'error',
        message: 'Network Error',
        data: null,
      });
    }
  }
};
