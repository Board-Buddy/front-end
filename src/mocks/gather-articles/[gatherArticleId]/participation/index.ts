import { API_BASE_URL } from '@/constants/env';
import { ParticipantInfo } from '@/types/article';
import { http, HttpResponse } from 'msw';

const participationMap = new Map<number, ParticipantInfo[]>([
  [
    1,
    [
      {
        id: 1,
        nickname: 'kong1',
        rank: 1,
        profileImageS3SavedURL: null,
      },
      {
        id: 2,
        nickname: 'kong2',
        rank: 2,
        profileImageS3SavedURL: null,
      },
      {
        id: 3,
        nickname: 'kong3',
        rank: null,
        profileImageS3SavedURL: null,
      },
    ],
  ],
  [2, []],
  [3, []],
  [4, []],
]);

export const getParticipants = http.get(
  `${API_BASE_URL}/api/gather-articles/:articleId([0-9]+)/participation`,
  ({ params }) => {
    const { articleId } = params;
    const participants = participationMap.get(Number(articleId)) || [];

    return HttpResponse.json({
      status: 'success',
      data: {
        participationAppliedMemberList: participants,
      },
      message: '댓글 조회를 성공하였습니다.',
    });
  },
);

export const approveParticipation = http.put(
  `${API_BASE_URL}/api/gather-articles/:articleId([0-9]+)/participation/:participationId([0-9]+)/approval`,
  ({ request, params }) => {
    const url = new URL(request.url);
    const applicantNickname = url.searchParams.get('applicantNickname');

    const { articleId } = params;

    const participants = participationMap.get(Number(articleId)) || [];

    if (participants) {
      const updatedParticipants = participants.filter(
        (member) => member.nickname !== applicantNickname,
      );
      participationMap.set(Number(articleId), updatedParticipants);

      return HttpResponse.json({
        status: 'success',
        data: null,
        message: `${applicantNickname}의 참가 신청을 성공적으로 승인하였습니다.`,
      });
    }
  },
);

export const participationHandlers = [getParticipants, approveParticipation];
