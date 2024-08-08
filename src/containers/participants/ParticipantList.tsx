'use client';

import {
  useApproveParticipation,
  useGetParticipationList,
  useRejectParticipation,
} from '@/hooks/useParticipation';
import Loading from '@/components/Loading';
import ErrorFallback from '@/components/ErrorFallback';
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
    refetch,
  } = useGetParticipationList(articleId);

  const approveMutation = useApproveParticipation(articleId);
  const rejectMutation = useRejectParticipation(articleId);

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    return (
      <ErrorFallback errMsg={error.response?.data.message} reset={refetch} />
    );
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

  const onRejectButtonClick = (
    participationId: string,
    applicantNickname: string,
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
          profileImageS3SavedURL={participant.profileImageS3SavedURL}
          rank={participant.rank}
          onApproveButtonClick={onApproveButtonClick}
          onRejectButtonClick={onRejectButtonClick}
        />
      ))}
    </div>
  );
};

export default ParticipantList;
