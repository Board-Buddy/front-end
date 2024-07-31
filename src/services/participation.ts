import api from '@/services';
import { handleApiError } from '@/utils/handleApiError';

/** 참가 신청 리스트 조회 API */
export const getParticipants = async ({ articleId }: { articleId: string }) => {
  try {
    const response = await api.get(
      `/api/gather-articles/${articleId}/participation`,
    );
    return response.data.data.participationAppliedMemberList;
  } catch (error: unknown) {
    handleApiError(error);
  }
};

/** 참가 신청 API */
export const applyParticipation = async ({
  articleId,
}: {
  articleId: string;
}) => {
  try {
    await api.post(`/api/gather-articles/${articleId}/participation`);
  } catch (error: unknown) {
    handleApiError(error);
  }
};

/** 참가 신청 취소 API */
export const cancelParticipation = async ({
  articleId,
}: {
  articleId: string;
}) => {
  try {
    await api.put(`/api/gather-articles/${articleId}/participation`);
  } catch (error: unknown) {
    handleApiError(error);
  }
};

/** 참가 신청 승인 API */
export const approveParticipation = async ({
  articleId,
  participationId,
  applicantNickname,
}: {
  articleId: string;
  participationId: string;
  applicantNickname: string;
}) => {
  try {
    await api.put(
      `/api/gather-articles/${articleId}/participation/${participationId}/approval?applicantNickname=${applicantNickname}`,
    );
  } catch (error: unknown) {
    handleApiError(error);
  }
};

/** 참가 신청 거절 API */
export const rejectParticipation = async ({
  articleId,
  participationId,
  applicantNickname,
}: {
  articleId: string;
  participationId: string;
  applicantNickname: string;
}) => {
  try {
    await api.put(
      `/api/gather-articles/${articleId}/participation/${participationId}/rejection?applicantNickname=${applicantNickname}`,
    );
  } catch (error: unknown) {
    handleApiError(error);
  }
};
