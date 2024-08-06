export interface Profile {
  profileImageS3SavedURL: string | null;
  description: string;
  rank: number | null;
  buddyScore: number;
  badges: string[];
  totalExcellentCount: number;
  totalGoodCount: number;
  totalBadCount: number;
  joinCount: number;
}

export interface EditProfileDTO {
  profileImageFile: string | null;
  nickname: string | null;
  password: string | null;
  phoneNumber: string | null;
  description: string | null;
}
