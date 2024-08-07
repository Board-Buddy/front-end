import { getMyArticles } from './gather-articles';
import { getMyNeighborhoods, setMyNeighborhoods } from './neighborhoods';
import { getMyJoinedArticles } from './participations';
import { setRadius } from './radius';

export const myActivityHandlers = [
  getMyArticles,
  getMyJoinedArticles,
  getMyNeighborhoods,
  setRadius,
  setMyNeighborhoods,
];
