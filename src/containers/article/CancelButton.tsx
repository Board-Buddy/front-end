import { Button } from '@/components/ui/button';
import { useCancelParticipation } from '@/hooks/useParticipation';
import { Article } from '@/types/article';
import { cn } from '@/utils/tailwind';

const CancelButton = ({ articleId }: { articleId: Article['id'] }) => {
  const cancelMutation = useCancelParticipation(articleId);

  const handleClick = () => {
    cancelMutation.mutate();
  };

  return (
    <div className="mb-8 px-4">
      <Button
        className={cn('w-full text-white font-bold text-base h-12 shadow-md')}
        onClick={handleClick}
      >
        참가 신청 취소
      </Button>
    </div>
  );
};

export default CancelButton;
