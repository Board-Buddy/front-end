import { API_BASE_URL } from '@/services/endpoint';
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
  `${API_BASE_URL}/gather-articles/:articleId([0-9]+)/participation`,
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

export const applyParticipation = http.post(
  `${API_BASE_URL}/gather-articles/:articleId([0-9]+)/participation`,
  ({ params }) => {
    const { articleId } = params;
    const participants = participationMap.get(Number(articleId)) || [];

    const newParticipation = {
      id: participants.length + 1,
      nickname: 'yubin',
      rank: null,
      profileImageS3SavedURL: null,
    };

    participants.push(newParticipation);
    participationMap.set(Number(articleId), participants);

    return HttpResponse.json({
      status: 'success',
      data: null,
      message: '해당 모집글에 참가 신청이 완료되었습니다.',
    });
  },
);

export const cancelParticipation = http.put(
  `${API_BASE_URL}/gather-articles/:articleId([0-9]+)/participation`,
  ({ params }) => {
    const { articleId } = params;
    const participants = participationMap.get(Number(articleId)) || [];

    const updatedParticipants = participants.filter(
      (participation) => participation.nickname !== 'yubin',
    );

    participationMap.set(Number(articleId), updatedParticipants);

    return HttpResponse.json({
      status: 'success',
      data: null,
      message: '해당 모집글의 참가 신청을 취소했습니다.',
    });
  },
);

export const approveParticipation = http.put(
  `${API_BASE_URL}/gather-articles/:articleId([0-9]+)/participation/:participationId([0-9]+)/approval`,
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
        message: `${applicantNickname}님의 참가 신청을 승인했습니다.`,
      });
    }
  },
);

export const rejectParticipation = http.put(
  `${API_BASE_URL}/gather-articles/:articleId([0-9]+)/participation/:participationId([0-9]+)/rejection`,
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
        message: `${applicantNickname}님의 참가 신청을 거절 했습니다.`,
      });
    }
  },
);

export const participationHandlers = [
  getParticipants,
  applyParticipation,
  approveParticipation,
  rejectParticipation,
  cancelParticipation,
];
