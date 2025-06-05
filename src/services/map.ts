import api from '@/services';
import { SuccessResponse } from '@/types/api';
import { Cafe } from '@/types/map';
import { ENDPOINT } from './endpoint';

/** 보드게임 카페 조회 API
 * @param x 경도
 * @param y 위도
 */
export const getBoardCafes = ({
  x,
  y,
  radius,
}: {
  x: number;
  y: number;
  radius: number;
}) =>
  api
    .get<SuccessResponse<{ cafes: Cafe[] }>>(ENDPOINT.BOARD_CAFES(), {
      params: { x, y, radius },
    })
    .then((response) => response.data.data.cafes);
