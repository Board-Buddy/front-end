import AppLink from '@/components/AppLink';
import { Button } from '@/components/ui/button';
import { Article } from '@/types/article';
import { cn } from '@/utils/tailwind';

const ParticipantsListButton = ({
  articleId,
}: {
  articleId: Article['id'];
}) => {
  return (
    <div className="mb-8 px-4">
      <AppLink href={`${articleId}/participants`} headerTitle="참가 신청 목록">
        <Button
          className={cn('w-full text-white font-bold text-base h-12 shadow-md')}
        >
          참가 신청 목록
        </Button>
      </AppLink>
    </div>
  );
};

export default ParticipantsListButton;
