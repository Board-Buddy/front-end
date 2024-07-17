import CustomAvatar from '@/components/CustomAvatar';

interface Props {
  nickname: string;
  profileUrl: string;
  rank: number;
}

const RankingBar = ({ nickname, profileUrl, rank }: Props) => {
  const height = [null, 'h-32', 'h-20', 'h-16'];
  const color = [null, 'bg-primary', 'bg-sub_first', 'bg-sub_second'];

  return (
    <div className="flex flex-col items-center gap-2">
      <CustomAvatar src={profileUrl} rank={rank} nickname={nickname} />
      <div
        className={`${height[rank]} ${color[rank]} w-13 text-center rounded-md p-1`}
      >
        <span className="text-xs text-gray-700 font-semibold bg-white bg-opacity-80 p-1 rounded-md">
          {nickname}
        </span>
      </div>
    </div>
  );
};

export default RankingBar;
