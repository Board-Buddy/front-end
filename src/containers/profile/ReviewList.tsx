import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ReviewList = () => {
  return (
    <div className="border-b-[1px] border-gray-200 p-4">
      <div className="flex justify-between items-center text-lg font-bold mb-4">
        <div className="flex gap-2">받은 후기</div>
      </div>
    </div>
  );
};

export default ReviewList;
