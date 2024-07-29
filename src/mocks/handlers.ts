import { authHandlers } from './auth';
import { boardCafeHandlers } from './board-cafes';
import { articleHandlers } from './gather-articles';
import { locationHandlers } from './locations';
import { radiusHandlers } from './radius';
import { rankingHandlers } from './rankings';

export const handlers = [
  ...authHandlers,
  ...articleHandlers,
  ...locationHandlers,
  ...radiusHandlers,
  ...boardCafeHandlers,
  ...rankingHandlers,
];
