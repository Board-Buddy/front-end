import { Slider } from '@/components/ui/noThumbSlider';

const BuddyPoint = ({ score }: { score: number }) => {
  return (
    <div className="items-center border-b-[1px] border-gray-200 pb-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center text-xl">
          <div className="w-full flex items-end relative">
            <p className="absolute left-1/2 -translate-x-1/2 text-sm">
              {score}
            </p>
            <p className="ml-auto">😀</p>
          </div>
        </div>
        <div />
        <Slider
          disabled
          defaultValue={[score]}
          max={100}
          min={0}
          minStepsBetweenThumbs={0}
        />
        <div className="w-full text-center">
          <p className="text-sm text-gray-600 underline mt-2">버디지수</p>
        </div>
      </div>
    </div>
  );
};

export default BuddyPoint;
