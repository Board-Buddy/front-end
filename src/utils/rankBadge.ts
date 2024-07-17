export const rankBadgeImageSrc = (rank: number) => {
  if (rank === 1) return '/images/badge/first_badge.png';
  else if (rank === 2) return '/images/badge/second_badge.png';
  else if (rank === 3) return '/images/badge/third_badge.png';
  else return null;
};
