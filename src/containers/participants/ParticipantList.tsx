'use client';

import {
  useApproveParticipation,
  useGetParticipationList,
} from '@/hooks/useParticipation';
import ParticipantItem from './ParticipantItem';

interface Props {
  articleId: string;
}

const ParticipantList = ({ articleId }: Props) => {
  const {
    data: participants,
    isPending,
    isError,
    error,
  } = useGetParticipationList(articleId);

  const approveMutation = useApproveParticipation(articleId);

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  const onApproveButtonClick = (
    participationId: string,
    applicantNickname: string,
  ) => {
    approveMutation.mutate({
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
          profileImageS3SavedURL={participant.profileImageS3SavedURL}
          rank={participant.rank}
          onApproveButtonClick={onApproveButtonClick}
        />
      ))}
    </div>
  );
};

export default ParticipantList;
