'use client';

import {
  useApproveParticipationRequest,
  useGetParticipationList,
  useRejectParticipationRequest,
} from '@/hooks/useParticipation';
import { Article, ParticipantInfo } from '@/types/article';
import ParticipantItem from './ParticipantItem';

interface Props {
  articleId: Article['id'];
}

const ParticipantList = ({ articleId }: Props) => {
  const { data: participants } = useGetParticipationList(articleId);

  const approveMutation = useApproveParticipationRequest(articleId);
  const rejectMutation = useRejectParticipationRequest(articleId);

  const onApproveButtonClick = (
    participationId: ParticipantInfo['id'],
    applicantNickname: ParticipantInfo['nickname'],
  ) => {
    approveMutation.mutate({
      participationId,
      applicantNickname,
    });
  };

  const onRejectButtonClick = (
    participationId: ParticipantInfo['id'],
    applicantNickname: ParticipantInfo['nickname'],
  ) => {
    rejectMutation.mutate({
      participationId,
      applicantNickname,
    });
  };

  return (
    <div>
      {participants.length === 0 && (
        <div className="flex justify-center pt-4 text-slate-600">
          참가 신청자가 없습니다.
        </div>
      )}
      {participants.map((participant) => (
        <ParticipantItem
          key={participant.id}
          id={participant.id}
          nickname={participant.nickname}
          profileImageSignedURL={participant.profileImageSignedURL}
          rank={participant.rank}
          onApproveButtonClick={onApproveButtonClick}
          onRejectButtonClick={onRejectButtonClick}
        />
      ))}
    </div>
  );
};

export default ParticipantList;
