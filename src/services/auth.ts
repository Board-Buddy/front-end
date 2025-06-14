import api from '@/services';
import { SuccessResponse } from '@/types/api';
import { UserInfo } from '@/types/user';
import { ENDPOINT } from './endpoint';

/** 아이디 중복 검사 API */
export const checkIdDuplicate = (id: string) =>
  api.post<SuccessResponse<null>>(ENDPOINT.AUTH.USERNAME_CHECK(), {
    username: id,
  });

/** 닉네임 중복 검사 API  */
export const checkNicknameDuplicate = (nickname: string) =>
  api.post<SuccessResponse<null>>(ENDPOINT.AUTH.NICKNAME_CHECK(), {
    nickname,
  });

/** SMS 인증 메시지 전송 API */
export const smsCertificationSend = (phoneNumber: string) =>
  api.post<SuccessResponse<null>>(ENDPOINT.AUTH.SMS_CERTIFICATION.SEND(), {
    phoneNumber,
  });

/** SMS 인증 API */
export const smsCertificationVerify = (data: {
  phoneNumber: string;
  certificationNumber: string;
}) =>
  api.post<SuccessResponse<null>>(ENDPOINT.AUTH.SMS_CERTIFICATION.VERIFY(), {
    phoneNumber: data.phoneNumber,
    certificationNumber: data.certificationNumber,
  });

/** 회원가입 API */
export const register = (data: {
  username: string;
  password: string;
  email: string;
  nickname: string;
  phoneNumber: string;
}) => api.post<SuccessResponse<null>>(ENDPOINT.AUTH.REGISTER(), data);

/** 로그인 API */
export const login = (data: { username: string; password: string }) =>
  api
    .post<
      SuccessResponse<{
        profileDTO: Omit<UserInfo, 'awsS3SavedFileURL'> & {
          profileImageS3SavedURL: string | null;
        };
      }>
    >(ENDPOINT.AUTH.LOGIN(), data)
    .then((response) => response.data.data.profileDTO);

/** 로그인 확인 API */
export const checkUserLogin = () =>
  api
    .get<
      SuccessResponse<{
        profileDTO: Omit<UserInfo, 'awsS3SavedFileURL'> & {
          profileImageS3SavedURL: string | null;
        };
      }>
    >(ENDPOINT.AUTH.STATUS())
    .then((response) => response.data.data.profileDTO);

/** 소셜 로그인 추가 인증 API */
export const oauthRegister = (data: { phoneNumber: string }) =>
  api.post<SuccessResponse<null>>(
    ENDPOINT.AUTH.SOCIAL_LOGIN.ADDITIONAL_CERTIFICATION(),
    data,
  );

/** 비밀번호 검증 API */
export const passwordCheck = (password: string) =>
  api.post<SuccessResponse<null>>(ENDPOINT.AUTH.PASSWORD_CERTIFICATION(), {
    password,
  });

/** 로그아웃 API */
export const logout = () =>
  api.post<SuccessResponse<null>>(ENDPOINT.AUTH.LOGOUT());

/** 회원탈퇴 API */
export const withdrawal = () =>
  api.post<SuccessResponse<null>>(ENDPOINT.AUTH.WITHDRAWAL());
