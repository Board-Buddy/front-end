import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const ReviewList = () => {
  return (
    <div className="border-b-[1px] border-gray-200 p-4">
      <div className="justify-between items-center text-lg font-bold">
        <div className="flex gap-2 mb-4">받은 후기</div>
      </div>
      <Card>
        <CardContent className="flex flex-col text-md mt-2 font-bold">
          <div className="text-secondary flex items-center justify-between">
            <Image
              src="/images/icon/great_icon.png"
              alt="최고"
              width={40}
              height={40}
              className="item-center"
            />
            <div>최고에요</div>
            <div>12</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col text-md mt-2 font-bold">
          <div className="text-secondary flex items-center justify-between">
            <Image
              src="/images/icon/good_icon.png"
              alt="좋아"
              width={40}
              height={40}
              className="item-center"
            />
            <div>좋아요</div>
            <div>3</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col text-md mt-2 font-bold">
          <div className="text-secondary flex items-center justify-between">
            <Image
              src="/images/icon/bad_icon.png"
              alt="별로"
              width={40}
              height={40}
              className="item-center"
            />
            <div>별로에요</div>
            <div>0</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewList;
