import api from '@/services';

/** 보드게임 카페 조회 API */
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
    .get(`/api/boardCafes`, { params: { x, y, radius } })
    .then((response) => response.data.data.cafes);
