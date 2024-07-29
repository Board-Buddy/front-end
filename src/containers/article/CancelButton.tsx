import { Button } from '@/components/ui/button';
import { useCancelParticipation } from '@/hooks/useParticipation';
import { cn } from '@/utils/tailwind';

const CancelButton = ({ articleId }: { articleId: number }) => {
  const cancelMutation = useCancelParticipation(articleId.toString());

  const handleClick = () => {
    cancelMutation.mutate();
  };

  return (
    <div className="px-4 mb-8">
      <Button
        className={cn('w-full text-white font-bold text-md h-12 shadow-md')}
        onClick={handleClick}
      >
        참가 신청 취소
      </Button>
    </div>
  );
};

export default CancelButton;
