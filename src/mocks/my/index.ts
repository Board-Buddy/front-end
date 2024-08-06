import { getMyArticles } from './gather-articles';
import { getMyJoinedArticles } from './participations';

export const myActivityHandlers = [getMyArticles, getMyJoinedArticles];
