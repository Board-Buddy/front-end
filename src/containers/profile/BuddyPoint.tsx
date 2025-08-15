import { Slider } from '@/components/ui/noThumbSlider';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Profile } from '@/types/profile';
import { PopoverArrow } from '@radix-ui/react-popover';
import { AlertCircleIcon } from 'lucide-react';

const BuddyPoint = ({ score }: { score: Profile['buddyScore'] }) => {
  return (
    <div className="mt-4">
      <div className="mb-1 flex items-center">
        <Popover>
          <PopoverTrigger asChild>
            <div className="group flex items-center gap-1 hover:cursor-pointer">
              <p className="ml-1 text-sm font-semibold text-gray-600 underline group-hover:text-gray-500">
                버디지수
              </p>
              <AlertCircleIcon
                className="rounded-full bg-gray-600 group-hover:bg-gray-500"
                color="white"
                size={18}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="mb-2 bg-white text-sm">
            <PopoverArrow fill="white" />
            <p>모임이 끝난 후 다른 플레이어의 후기에 따라 달라져요.</p>
            <p>좋은 후기를 받으면 점수가 올라가요.</p>
          </PopoverContent>
        </Popover>
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
