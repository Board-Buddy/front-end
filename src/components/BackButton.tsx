import { cn } from '@/utils/tailwind';
import { ChevronLeft } from 'lucide-react';

interface Props {
  className?: string;
}

const BackButton = ({ className }: Props) => {
  return (
    <ChevronLeft
      type="button"
      aria-label="뒤로가기"
      className={cn('size-5 cursor-pointer', className)}
      onClick={() => {
        window.history.back();
      }}
    />
  );
};

export default BackButton;
