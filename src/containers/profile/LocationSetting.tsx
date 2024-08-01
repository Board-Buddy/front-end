import { ChevronRight } from 'lucide-react';

const LocationSetting = () => {
  return (
    <div className="border-b-[1px] border-gray-200 p-4">
      <div className="flex justify-between items-center text-lg font-bold">
        <div className="flex gap-2">위치 재설정</div>
        <ChevronRight className="w-5 h-5 text-gray-700 ml-1" />
      </div>
    </div>
  );
};

export default LocationSetting;
