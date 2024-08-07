import { checkNickname } from './username/check';
import { checkUsername } from './nickname/check';
import { login } from './login';
import { oauthRegister } from './oauth2/register';
import { register } from './register';
import { smsCertificationSend } from './sms-certifications/send';
import { smsCertificationVerify } from './sms-certifications/verify';
import { status } from './status';
import { searchLocation } from './locations/search';
import { passwordCheck } from './password';
import { logout } from './logout';
import { withdrawal } from './withdrawal';

export const authHandlers = [
  status,
  login,
  register,
  checkUsername,
  checkNickname,
  smsCertificationSend,
  smsCertificationVerify,
  oauthRegister,
  searchLocation,
  passwordCheck,
  logout,
  withdrawal,
];
