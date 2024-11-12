import api from '@/services';
import handleApiError from '@/utils/handleApiError';

/** 랭킹 조회 API */
export const getRankings = async () => {
  try {
    const response = await api.get(`/v1/rankings`);
    return response.data.data.rankings;
  } catch (error: unknown) {
    handleApiError(error);
  }
};
