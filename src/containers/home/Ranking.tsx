import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Ranking = () => {
  return (
    <Card className="border-none bg-yellow-50">
      <CardHeader>
        <CardTitle>이번 달 Top 3</CardTitle>
      </CardHeader>
      <CardContent />
    </Card>
  );
};

export default Ranking;
