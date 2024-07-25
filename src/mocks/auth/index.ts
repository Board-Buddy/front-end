import { checkNickname } from './check-nickname';
import { checkUsername } from './check-username';
import { login } from './login';
import { oauthRegister } from './oauth2/register';
import { register } from './register';
import { smsCertificationSend } from './sms-certifications/send';
import { smsCertificationVerify } from './sms-certifications/verify';
import { status } from './status';

export const authHandlers = [
  status,
  login,
  register,
  checkUsername,
  checkNickname,
  smsCertificationSend,
  smsCertificationVerify,
  oauthRegister,
];
