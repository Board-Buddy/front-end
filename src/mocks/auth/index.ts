import { checkNickname } from './check-nickname';
import { checkUsername } from './check-username';
import { login } from './login';
import { status } from './status';

export const authHandlers = [status, login, checkUsername, checkNickname];
