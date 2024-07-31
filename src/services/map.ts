import api from '@/services';
import { handleApiError } from '@/utils/handleApiError';

/** 보드게임 카페 조회 API
 * @param x 경도
 * @param y 위도
 */
export const getBoardCafes = async ({
  x,
  y,
  radius,
}: {
  x: number;
  y: number;
  radius: number;
}) => {
  try {
    const response = await api.get(`/api/board-cafes`, {
      params: { x, y, radius },
    });
    return response.data.data.cafes;
  } catch (error: unknown) {
    handleApiError(error);
  }
};
