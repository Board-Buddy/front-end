import api from '@/services';
import { Article, ParticipantInfo } from '@/types/article';
import { UserInfo } from '@/types/user';
import { SuccessResponse } from '@/types/api';
import { ENDPOINT } from './endpoint';

/** 참가 신청 리스트 조회 API */
export const getParticipants = ({ articleId }: { articleId: Article['id'] }) =>
  api
    .get<
      SuccessResponse<{ participationAppliedMemberList: ParticipantInfo[] }>
    >(ENDPOINT.GATHER_ARTICLE.PARTICIPATION.APPLICATION(articleId))
    .then((response) => response.data.data.participationAppliedMemberList);

/** 참가 신청 API */
export const applyParticipation = ({
  articleId,
}: {
  articleId: Article['id'];
}) =>
  api.post<SuccessResponse<null>>(
    ENDPOINT.GATHER_ARTICLE.PARTICIPATION.APPLICATION(articleId),
  );

/** 참가 신청 취소 API */
export const cancelParticipation = ({
  articleId,
}: {
  articleId: Article['id'];
}) =>
  api.put<SuccessResponse<null>>(
    ENDPOINT.GATHER_ARTICLE.PARTICIPATION.APPLICATION(articleId),
  );

/** 참가 신청 승인 API */
export const approveParticipation = ({
  articleId,
  participationId,
  applicantNickname,
}: {
  articleId: Article['id'];
  participationId: ParticipantInfo['id'];
  applicantNickname: UserInfo['nickname'];
}) =>
  api.put<SuccessResponse<null>>(
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
  articleId: Article['id'];
  participationId: ParticipantInfo['id'];
  applicantNickname: UserInfo['nickname'];
}) =>
  api.put<SuccessResponse<null>>(
    ENDPOINT.GATHER_ARTICLE.PARTICIPATION.REJECTION(
      articleId,
      participationId,
      applicantNickname,
    ),
  );
