import { Button } from '@/components/ui/button';
import { cn } from '@/utils/tailwind';
import { RotateCcwIcon } from 'lucide-react';

interface Props {
  show: boolean;
  onClick: () => void;
}

const ReloadButton = ({ show, onClick }: Props) => {
  return (
    <div
      className={cn(
        'absolute top-3 left-1/2 -ml-[68px] z-10 transition-all',
        show ? 'visible' : 'hidden',
      )}
    >
      <Button
        className="border border-gray-300 text-primary font-bold bg-white rounded-3xl px-3 py-0 text-sm shadow-md"
        onClick={onClick}
      >
        <RotateCcwIcon className="size-4 mr-1" />현 지도에서 검색
      </Button>
    </div>
  );
};

export default ReloadButton;
