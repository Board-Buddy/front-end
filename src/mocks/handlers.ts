import { authHandlers } from './auth';
import { badgeHandlers } from './badges';
import { boardCafeHandlers } from './board-cafes';
import { chatHandlers } from './chat';
import { articleHandlers } from './gather-articles';
import { participationHandlers } from './gather-articles/[gatherArticleId]/participation';
import { locationHandlers } from './locations';
import { notificationHandlers } from './notifications';
import { profileHandlers } from './profiles';
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
  ...profileHandlers,
  ...badgeHandlers,
];
