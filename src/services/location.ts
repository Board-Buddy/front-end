import api from '@/services';
import { handleApiError } from '@/utils/handleApiError';

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
    const response = await api.get(uri);
    return response.data.data.locations;
  } catch (error: unknown) {
    handleApiError(error);
  }
};
