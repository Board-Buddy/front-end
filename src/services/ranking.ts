import api from '@/services';
import { SuccessResponse } from '@/types/api';
import { Ranking } from '@/types/ranking';
import { ENDPOINT } from './endpoint';

/** 랭킹 조회 API */
export const getRankings = () =>
  api
    .get<SuccessResponse<{ rankings: Ranking[] }>>(ENDPOINT.RANKINGS())
    .then((response) => response.data.data.rankings);
