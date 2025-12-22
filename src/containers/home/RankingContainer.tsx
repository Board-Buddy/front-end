import Ranking from './Ranking';
import { QueryFallbackBoundary } from '@/components/QueryFallbackBoundary';

const RankingContainer = () => {
  return (
    <div
      className="my-2 flex min-h-40 items-center justify-center"
      aria-label="이번 달 랭킹"
    >
      <QueryFallbackBoundary>
        <Ranking />
      </QueryFallbackBoundary>
    </div>
  );
};

export default RankingContainer;
