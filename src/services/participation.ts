import api from '@/services';
import { ENDPOINT } from './endpoint';

/** 참가 신청 리스트 조회 API */
export const getParticipants = ({ articleId }: { articleId: number }) =>
  api
    .get(ENDPOINT.GATHER_ARTICLE.PARTICIPATION.APPLICATION(articleId))
    .then((response) => response.data.data.participationAppliedMemberList);

/** 참가 신청 API */
export const applyParticipation = ({ articleId }: { articleId: number }) =>
  api.post(ENDPOINT.GATHER_ARTICLE.PARTICIPATION.APPLICATION(articleId));

/** 참가 신청 취소 API */
export const cancelParticipation = ({ articleId }: { articleId: number }) =>
  api.put(ENDPOINT.GATHER_ARTICLE.PARTICIPATION.APPLICATION(articleId));

/** 참가 신청 승인 API */
export const approveParticipation = ({
  articleId,
  participationId,
  applicantNickname,
}: {
  articleId: number;
  participationId: number;
  applicantNickname: string;
}) =>
  api.put(
    ENDPOINT.GATHER_ARTICLE.PARTICIPATION.APPROVAL(
      articleId,
      participationId,
      applicantNickname,
    ),
  );

/** 참가 신청 거절 API */
export const rejectParticipation = ({
  articleId,
  participationId,
  applicantNickname,
}: {
  articleId: number;
  participationId: number;
  applicantNickname: string;
}) =>
  api.put(
    ENDPOINT.GATHER_ARTICLE.PARTICIPATION.REJECTION(
      articleId,
      participationId,
      applicantNickname,
    ),
  );
