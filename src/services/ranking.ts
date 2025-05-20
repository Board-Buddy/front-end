import api from '@/services';
import handleApiError from '@/utils/handleApiError';
import { ENDPOINT } from './endpoint';

/** 랭킹 조회 API */
export const getRankings = async () => {
  try {
    const response = await api.get(ENDPOINT.RANKINGS());
    return response.data.data.rankings;
  } catch (error: unknown) {
    handleApiError(error);
  }
};
