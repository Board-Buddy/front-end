import api from '@/services';

/** 랭킹 조회 API */
export const getRankings = () =>
  api.get(`/api/rankings`).then((response) => response.data.data.rankings);
