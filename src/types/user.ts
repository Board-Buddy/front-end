export interface UserInfo {
  nickname: string;
  sido: string;
  sgg: string;
  emd: string;
  isPhoneNumberVerified: boolean;
  awsS3SavedFileURL: string | null;
}

export interface UserLoginResponse {
  status: string;
  data: {
    profileDTO: UserInfo;
  };
  message: string;
}
