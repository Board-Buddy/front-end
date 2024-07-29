import CustomAvatar from '@/components/CustomAvatar';
import { Button } from '@/components/ui/button';
import { ParticipantInfo } from '@/types/article';

interface Props extends ParticipantInfo {
  onApproveButtonClick: (
    participationId: string,
    applicantNickname: string,
  ) => void;
  onRejectButtonClick: (
    participationId: string,
    applicantNickname: string,
  ) => void;
}

const ParticipantItem = ({
  id,
  nickname,
  profileImageS3SavedURL,
  rank,
  onApproveButtonClick,
  onRejectButtonClick,
}: Props) => {
  return (
    <div className="px-4 py-2 flex items-center gap-3 border-b border-b-slate-100">
      <CustomAvatar
        src={profileImageS3SavedURL}
        rank={rank}
        nickname={nickname}
        avatarSize="sm"
      />
      <span>{nickname}</span>
      <div className="ml-auto flex gap-1 items-center">
        <Button
          className="text-white rounded-lg h-8"
          onClick={() => onApproveButtonClick(id.toString(), nickname)}
        >
          승인
        </Button>
        <Button
          className="shadow-[inset_0_0_0_1px] text-primary bg-white rounded-lg h-8"
          onClick={() => onRejectButtonClick(id.toString(), nickname)}
        >
          거절
        </Button>
      </div>
    </div>
  );
};

export default ParticipantItem;
