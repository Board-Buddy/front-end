import { Slider } from '@/components/ui/noThumbSlider';
import { Profile } from '@/types/profile';
import { AlertCircleIcon } from 'lucide-react';

const BuddyPoint = ({ score }: { score: Profile['buddyScore'] }) => {
  return (
    <div className="mt-4">
      <div className="mb-1 flex items-center">
        <AlertCircleIcon
          className="rounded-full bg-gray-600"
          color="white"
          size={14}
        />
        <p className="ml-1 text-sm font-semibold text-gray-600">버디지수</p>
        <p className="ml-auto text-sm font-semibold text-primary">{score}</p>
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
