import api from '@/services';
import { CustomError } from '@/types/api';
import axios from 'axios';

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
    if (axios.isAxiosError(error) && error.response) {
      throw {
        status: error.response.status,
        message: error.response.data.message || 'Something went wrong',
        data: error.response.data,
      } as CustomError;
    } else {
      throw {
        status: 'error',
        message: 'Network Error',
        data: null,
      } as CustomError;
    }
  }
};
