import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, ThumbsDown, ThumbsUp } from 'lucide-react';

const ReviewList = ({
  totalExcellentCount,
  totalGoodCount,
  totalBadCount,
}: {
  totalExcellentCount: number;
  totalGoodCount: number;
  totalBadCount: number;
}) => {
  return (
    <div className="border-b-[1px] border-gray-200 py-4">
      <div className="justify-between items-center font-bold">
        <div className="flex gap-2 mb-4 px-1">받은 후기</div>
      </div>
      <div className="flex flex-col gap-2">
        <Card className="border-none shadow-none">
          <CardContent className="font-bold py-2 px-4 bg-[#FFF3E0] rounded-xl !border-none">
            <div className="text-primary flex items-center justify-between">
              <Sparkles />
              <div>최고에요</div>
              <div>{totalExcellentCount}</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-none">
          <CardContent className="font-bold py-2 px-4 bg-[#FFF3E0] rounded-xl ">
            <div className="text-primary flex items-center justify-between">
              <ThumbsUp />
              <div>좋아요</div>
              <div>{totalGoodCount}</div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-none">
          <CardContent className="font-bold py-2 px-4 bg-[#FFF3E0] rounded-xl ">
            <div className="text-primary flex items-center justify-between">
              <ThumbsDown />
              <div>별로에요</div>
              <div>{totalBadCount}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReviewList;
