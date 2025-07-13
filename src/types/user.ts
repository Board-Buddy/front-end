export interface UserInfo {
  nickname: string;
  memberType: 'REGULAR' | 'SOCIAL';
  isPhoneNumberVerified: boolean;
  profileImageSignedURL: string | null;
}
