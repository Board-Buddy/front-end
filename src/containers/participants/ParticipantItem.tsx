import CustomAvatar from '@/components/CustomAvatar';
import { Button } from '@/components/ui/button';
import { ParticipantInfo } from '@/types/article';

interface Props extends ParticipantInfo {
  onApproveButtonClick: (
    participationId: ParticipantInfo['id'],
    applicantNickname: ParticipantInfo['nickname'],
  ) => void;
  onRejectButtonClick: (
    participationId: ParticipantInfo['id'],
    applicantNickname: ParticipantInfo['nickname'],
  ) => void;
}

const ParticipantItem = ({
  id,
  nickname,
  profileImageSignedURL,
  rank,
  onApproveButtonClick,
  onRejectButtonClick,
}: Props) => {
  return (
    <div className="flex items-center gap-3 border-b border-b-slate-100 px-4 py-2">
      <CustomAvatar
        src={profileImageSignedURL}
        rank={rank}
        nickname={nickname}
        avatarSize="sm"
      />
      <span>{nickname}</span>
      <div className="ml-auto flex items-center gap-1">
        <Button
          className="h-8 rounded-lg text-white"
          onClick={() => onApproveButtonClick(id, nickname)}
        >
          승인
        </Button>
        <Button
          className="h-8 rounded-lg bg-white text-primary shadow-[inset_0_0_0_1px]"
          onClick={() => onRejectButtonClick(id, nickname)}
        >
          거절
        </Button>
      </div>
    </div>
  );
};

export default ParticipantItem;
