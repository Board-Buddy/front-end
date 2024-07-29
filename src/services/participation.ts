import api from '@/services';

/** 참가 신청 리스트 조회 API */
export const getParticipants = ({ articleId }: { articleId: string }) =>
  api
    .get(`/api/gather-articles/${articleId}/participation`)
    .then((response) => response.data.data.participationAppliedMemberList);

/** 참가 신청 승인 API */
export const approveParticipant = ({
  articleId,
  participationId,
  applicantNickname,
}: {
  articleId: string;
  participationId: string;
  applicantNickname: string;
}) =>
  api
    .put(
      `/api/gather-articles/${articleId}/participation/${participationId}/approval?applicantNickname=${applicantNickname}`,
    )
    .then((response) => response.data.status);
