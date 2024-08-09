import { Slider } from '@/components/ui/noThumbSlider';
import { AlertCircleIcon } from 'lucide-react';

const BuddyPoint = ({ score }: { score: number }) => {
  return (
    <div className="mt-4">
      <div className="flex items-center mb-1">
        <AlertCircleIcon
          className="bg-gray-600 rounded-full"
          color="white"
          size={14}
        />
        <p className="text-sm text-gray-600 ml-1 font-semibold">버디지수</p>
        <p className="text-sm text-primary font-semibold ml-auto">{score}</p>
      </div>
      <Slider
        disabled
        defaultValue={[score]}
        max={100}
        min={0}
        minStepsBetweenThumbs={0}
      />
    </div>
  );
};

export default BuddyPoint;
