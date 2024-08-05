export interface Profile {
  description: string;
  rank: number | null;
  buddyScore: number;
  badges: string[];
  totalExcellentCount: number;
  totalGoodCount: number;
  totalBadCount: number;
}
