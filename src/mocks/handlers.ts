import { authHandlers } from './auth';
import { boardCafeHandlers } from './board-cafes';
import { chatHandlers } from './chat';
import { articleHandlers } from './gather-articles';
import { participationHandlers } from './gather-articles/[gatherArticleId]/participation';
import { locationHandlers } from './locations';
import { notificationHandlers } from './notifications';
import { radiusHandlers } from './radius';
import { rankingHandlers } from './rankings';

export const handlers = [
  ...authHandlers,
  ...articleHandlers,
  ...locationHandlers,
  ...radiusHandlers,
  ...boardCafeHandlers,
  ...rankingHandlers,
  ...participationHandlers,
  ...chatHandlers,
  ...notificationHandlers,
];
