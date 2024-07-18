'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RankingBar from './RankingBar';

const Ranking = () => {
  const rankingData = [
    {
      rank: 2,
      name: '닉네임긴버전안녕',
      profileUrl: '',
    },
    {
      rank: 1,
      name: 'User1',
      profileUrl: '',
    },
    {
      rank: 3,
      name: 'User3',
      profileUrl: '',
    },
  ];

  return (
    <Card className="border-none bg-yellow-50">
      <CardHeader>
        <CardTitle className="text-md">지난달 Top 3</CardTitle>
      </CardHeader>
      <CardContent className="flex items-end justify-center gap-2">
        {rankingData.map((person) => (
          <RankingBar
            nickname={person.name}
            profileUrl={person.profileUrl}
            rank={person.rank}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default Ranking;
