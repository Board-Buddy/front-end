'use client';

import { useGetRankings } from '@/hooks/useRankings';
import RankingCard from './RankingCard';

const Ranking = () => {
  const { data } = useGetRankings();

  const rankingData = [
    { rank: 2, ...data[1] },
    { rank: 1, ...data[0] },
    { rank: 3, ...data[2] },
  ];

  return (
    <>
      {rankingData.map((person) => (
        <RankingCard
          key={person.rank}
          nickname={person.nickname}
          profileUrl={person.profileImageSignedURL}
          rank={person.rank}
        />
      ))}
    </>
  );
};

export default Ranking;
