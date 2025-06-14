import { Button } from '@/components/ui/button';
import { Article } from '@/types/article';
import { cn } from '@/utils/tailwind';
import Link from 'next/link';

const ParticipantsListButton = ({
  articleId,
}: {
  articleId: Article['id'];
}) => {
  return (
    <div className="mb-8 px-4">
      <Link href={`${articleId}/participants`}>
        <Button
          className={cn('w-full text-white font-bold text-base h-12 shadow-md')}
        >
          참가 신청 목록
        </Button>
      </Link>
    </div>
  );
};

export default ParticipantsListButton;
