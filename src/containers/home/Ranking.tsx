'use client';

import { useGetRankings } from '@/hooks/useRankings';
import Loading from '@/components/Loading';
import ErrorFallback from '@/components/ErrorFallback';
import RankingCard from './RankingCard';

const Ranking = () => {
  const { data, isPending, isError, error, refetch } = useGetRankings();

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return (
      <ErrorFallback errMsg={error.response?.data.message} reset={refetch} />
    );
  }

  const rankingData = [
    { rank: 2, ...data[1] },
    { rank: 1, ...data[0] },
    { rank: 3, ...data[2] },
  ];

  return (
    <div className="my-2 flex justify-center items-center">
      {rankingData.map((person) => (
        <RankingCard
          key={person.rank}
          nickname={person.nickname}
          profileUrl={person.profileImageS3SavedURL}
          rank={person.rank}
        />
      ))}
    </div>
  );
};

export default Ranking;
