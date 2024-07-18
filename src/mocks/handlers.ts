import { authHandlers } from './auth';
import { articleHandlers } from './gatherArticles';

export const handlers = [...authHandlers, ...articleHandlers];
