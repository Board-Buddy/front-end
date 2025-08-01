'use client';

import {
  useApproveParticipation,
  useGetParticipationList,
  useRejectParticipation,
} from '@/hooks/useParticipation';
import Loading from '@/components/Loading';
import ErrorFallback from '@/components/ErrorFallback';
import { Article, ParticipantInfo } from '@/types/article';
import ParticipantItem from './ParticipantItem';

interface Props {
  articleId: Article['id'];
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
    if (error.response?.status === 401) {
      throw error;
    }

    return (
      <ErrorFallback reset={refetch} errMsg={error.response!.data.message} />
    );
  }

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
