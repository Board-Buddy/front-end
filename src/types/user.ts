export interface UserInfo {
  nickname: string;
  memberType: 'REGULAR' | 'SOCIAL';
  sido: string;
  sgg: string;
  emd: string;
  isPhoneNumberVerified: boolean;
  awsS3SavedFileURL: string | null;
}
