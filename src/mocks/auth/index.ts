import { login } from './login';
import { oauthRegister } from './oauth2/register';
import { register } from './register';
import { smsCertificationSend } from './sms-certifications/send';
import { smsCertificationVerify } from './sms-certifications/verify';
import { status } from './status';
import { passwordCheck } from './password';
import { logout } from './logout';
import { withdrawal } from './withdrawal';
import { checkUsername } from './username/check';
import { checkNickname } from './nickname/check';

export const authHandlers = [
  status,
  login,
  register,
  checkUsername,
  checkNickname,
  smsCertificationSend,
  smsCertificationVerify,
  oauthRegister,
  passwordCheck,
  logout,
  withdrawal,
];
