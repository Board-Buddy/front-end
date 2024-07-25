export interface UserInfo {
  nickname: string;
  sido: string;
  sigu: string;
  dong: string;
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
