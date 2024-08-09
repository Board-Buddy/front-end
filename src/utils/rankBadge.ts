export const rankBadgeImageSrc = (rank: number) => {
  if (rank === 1) return '/images/badge/first_rank_badge.png';
  if (rank === 2) return '/images/badge/second_rank_badge.png';
  if (rank === 3) return '/images/badge/third_rank_badge.png';
  return null;
};
