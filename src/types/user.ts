export interface UserInfo {
  nickname: string;
  memberType: 'REGULAR' | 'SOCIAL';
  isPhoneNumberVerified: boolean;
  profileImageS3SavedURL: string | null;
}
