import api from '@/services';

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
    .get(`/board-cafes`, {
      params: { x, y, radius },
    })
    .then((response) => response.data.data.cafes);
