import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const LocationSetting = () => {
  return (
    <Link href="/setting/location">
      <div className="border-b-[1px] border-gray-200 px-1 py-4">
        <div className="flex justify-between items-center text-md">
          <div className="flex gap-2">위치 재설정</div>
          <ChevronRight className="w-5 h-5 text-gray-700 ml-1" />
        </div>
      </div>
    </Link>
  );
};

export default LocationSetting;
