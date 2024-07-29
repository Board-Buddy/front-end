import api from '@/services';

/** 참가 신청 리스트 조회 API */
export const getParticipants = ({ articleId }: { articleId: string }) =>
  api
    .get(`/api/gather-articles/${articleId}/participation`)
    .then((response) => response.data.data.participationAppliedMemberList);
