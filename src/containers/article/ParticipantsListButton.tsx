import { Button } from '@/components/ui/button';
import { cn } from '@/utils/tailwind';
import Link from 'next/link';

const ParticipantsListButton = ({ articleId }: { articleId: number }) => {
  return (
    <div className="px-4 mb-8">
      <Link href={`${articleId}/participants`}>
        <Button
          className={cn('w-full text-white font-bold text-md h-12 shadow-md')}
        >
          참가 신청 목록
        </Button>
      </Link>
    </div>
  );
};

export default ParticipantsListButton;
