import { Slider } from '@/components/ui/slider';

const BuddyPoint = () => {
  return (
    <div className="items-center border-b-[1px] border-gray-200 p-4">
      <div className="flex flex-col gap-2">
        <div className="flex items-center text-xl">
          <div className="w-full flex items-center relative">
            <p className="absolute left-1/2 transform -translate-x-1/2">50</p>
            <p className="ml-auto">😀</p>
          </div>
        </div>
        <div></div>
        <div className="flex items-center gap-4">
          <Slider
            disabled={true}
            defaultValue={[50]}
            max={100}
            min={0}
            minStepsBetweenThumbs={0}
            style={{
              '--thumb-display': 'none',
            }}
          />
        </div>
        <div className="w-full text-center">
          <p className="text-sm text-gray-600 underline">버디지수</p>
        </div>
      </div>
    </div>
  );
};

export default BuddyPoint;
