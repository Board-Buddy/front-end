import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';

const BadgeList = () => {
  return (
    <div className="border-b-[1px] border-gray-200 p-4">
      <div className="flex justify-between items-center text-lg font-bold mb-4">
        <div className="flex gap-2">뱃지 목록</div>
        <div className="flex items-center text-sm text-gray-700 font-bold">
          <p>전체보기</p>
          <ChevronRight className="w-5 h-5 text-gray-700 ml-1" />
        </div>
      </div>
      <div className="flex justify-center items-center space-x-16 p-4">
        <div>
          <Badge variant="default">뱃지</Badge>
        </div>
        <div>
          <Badge variant="default">뱃지</Badge>
        </div>
        <div>
          <Badge variant="default">뱃지</Badge>
        </div>
      </div>
    </div>
  );
};

export default BadgeList;
