export interface UserInfo {
  nickname: string;
  memberType: 'REGULAR' | 'SOCIAL';
  isPhoneNumberVerified: boolean;
  awsS3SavedFileURL: string | null;
}
