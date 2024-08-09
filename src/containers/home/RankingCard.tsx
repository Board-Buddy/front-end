import CustomAvatar from '@/components/CustomAvatar';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/utils/tailwind';

interface Props {
  nickname: string;
  profileUrl: string | null;
  rank: number;
}

const RankingCard = ({ nickname, profileUrl, rank }: Props) => {
  return (
    <Card
      className={cn(
        rank === 1
          ? 'size-40 bg-[#FFF1D8] shadow-[0_0_10px_rgba(0,0,0,0.2)] z-40'
          : 'size-32 shadow-none bg-[#efefef]',
        'rounded-2xl  flex justify-center items-center border-none',
        rank === 2 && 'translate-x-6',
        rank === 3 && '-translate-x-6',
      )}
    >
      <CardContent className="p-0">
        <div className="flex flex-col items-center gap-2">
          <CustomAvatar
            src={profileUrl}
            rank={rank}
            nickname={nickname}
            avatarSize={rank === 1 ? 'md' : 'sm'}
          />
          <span
            className={cn(
              'text-gray-500 font-bold line-clamp-2',
              rank === 1 ? 'text-md' : 'text-sm',
            )}
          >
            {nickname}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default RankingCard;
