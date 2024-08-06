import { cn } from '@/utils/tailwind';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

const BadgeList = ({ badges }: { badges: string[] }) => {
  return (
    <div className="border-b-[1px] border-gray-200 py-4">
      <div className="flex justify-between items-center font-bold mb-4">
        <div className="flex gap-2 px-1">뱃지 목록</div>
        <div className="flex items-center text-sm text-gray-700 font-bold">
          <p>전체보기</p>
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </div>
      </div>
      <div
        className={cn(
          'flex justify-center items-center space-x-16',
          badges.length === 0 ? 'pb-4' : 'p-4',
        )}
      >
        {badges.length === 0 && (
          <div className="text-sm text-gray-600">획득한 뱃지가 없습니다.</div>
        )}
        {badges.map(
          (badge) =>
            badge && (
              <Image src={badge} alt="badge image" width={48} height={48} />
            ),
        )}
      </div>
    </div>
  );
};

export default BadgeList;
