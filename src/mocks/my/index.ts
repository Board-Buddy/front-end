import { getMyArticles } from './gather-articles';
import { getMyNeighborhoods } from './neighborhoods';
import { getMyJoinedArticles } from './participations';

export const myActivityHandlers = [
  getMyArticles,
  getMyJoinedArticles,
  getMyNeighborhoods,
];
