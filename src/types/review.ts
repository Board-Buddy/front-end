export interface Review {
  nickname: string;
  hasReviewed: boolean;
  profileImageS3SavedURL: string | null;
  rank: number | null;
}
