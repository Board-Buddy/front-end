'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetRankings } from '@/hooks/useRankings';
import Loading from '@/components/Loading';
import ErrorFallback from '@/components/ErrorFallback';
import RankingBar from './RankingBar';

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
    <Card className="border-none bg-yellow-50">
      <CardHeader>
        <CardTitle className="text-md">지난달 Top 3</CardTitle>
      </CardHeader>
      <CardContent className="flex items-end justify-center gap-3">
        {rankingData.map((person) => (
          <RankingBar
            key={person.rank}
            nickname={person.nickname}
            profileUrl={person.profileImageS3SavedURL}
            rank={person.rank}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default Ranking;
