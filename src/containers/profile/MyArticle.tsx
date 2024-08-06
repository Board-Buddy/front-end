import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const MyArticle = () => {
  return (
    <Link href="my/activity">
      <div className="border-b-[1px] border-gray-200 py-4 px-1">
        <div className="flex justify-between items-center text-md">
          <div className="flex gap-2">나의 활동</div>
          <ChevronRight className="w-5 h-5 text-gray-700 ml-1" />
        </div>
      </div>
    </Link>
  );
};
export default MyArticle;
