export interface Review {
  nickname: string;
  isReviewed: boolean;
  profileImageS3SavedURL: string | null;
  rank: number | null;
}
