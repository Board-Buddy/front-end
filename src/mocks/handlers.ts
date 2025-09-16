import { authHandlers } from './auth';
import { badgeHandlers } from './badges';
import { boardCafeHandlers } from './board-cafes';
import { chatHandlers } from './chat';
import { articleHandlers } from './gather-articles';
import { participationHandlers } from './gather-articles/[gatherArticleId]/participation';
import { membersHandlers } from './members';
import { myActivityHandlers } from './my';
import { notificationHandlers } from './notifications';
import { profileHandlers } from './profiles';
import { rankingHandlers } from './rankings';
import { RegionHandlers } from './regions';
import { reviewHandlers } from './reviews';
import { wsHandlers } from './ws';

export const handlers = [
  ...authHandlers,
  ...articleHandlers,
  ...boardCafeHandlers,
  ...rankingHandlers,
  ...participationHandlers,
  ...chatHandlers,
  ...notificationHandlers,
  ...profileHandlers,
  ...badgeHandlers,
  ...myActivityHandlers,
  ...reviewHandlers,
  ...wsHandlers,
  ...RegionHandlers,
  ...membersHandlers,
];
