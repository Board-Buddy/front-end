import { authHandlers } from './auth';
import { articleHandlers } from './gatherArticles';
import { locationHandlers } from './locations';
import { radiusHandlers } from './radius';

export const handlers = [
  ...authHandlers,
  ...articleHandlers,
  ...locationHandlers,
  ...radiusHandlers,
];
