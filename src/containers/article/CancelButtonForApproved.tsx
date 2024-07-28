import { Button } from '@/components/ui/button';
import { cn } from '@/utils/tailwind';

const CancelButtonForApproved = ({ articleId }: { articleId: number }) => {
  // TODO: 취소 시 확인 모달 띄우기
  return (
    <div className="px-4 mb-8">
      <Button
        className={cn('w-full text-white font-bold text-md h-12 shadow-md')}
      >
        참가 취소
      </Button>
    </div>
  );
};

export default CancelButtonForApproved;
