import CustomAvatar from '@/components/CustomAvatar';

interface Props {
  nickname: string;
  profileUrl: string | null;
  rank: number;
}

const RankingBar = ({ nickname, profileUrl, rank }: Props) => {
  const height = [null, 'h-36', 'h-24', 'h-16'];
  const color = [null, 'bg-primary', 'bg-sub_first', 'bg-sub_second'];

  return (
    <div className="flex flex-col items-center gap-2">
      <CustomAvatar
        src={profileUrl}
        rank={rank}
        nickname={nickname}
        avatarSize="sm"
      />
      <div
        className={`${height[rank]} ${color[rank]} text-center rounded-md p-1`}
      >
        <div className="bg-white bg-opacity-80 px-1 rounded-md w-12 py-1">
          <span className="text-xs text-gray-700 font-semibold line-clamp-2">
            {nickname}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RankingBar;
