import { createMockHandler } from '@/mocks';
import { ParticipantInfo } from '@/types/article';
import { HttpResponse } from 'msw';
import { GATHER_ARTICLE_MOCK_DATA } from '../..';
import { getLoggedInUserInfo } from '@/mocks/auth/login';

const participationMap = new Map<number, ParticipantInfo[]>([
  [
    1,
    [
      {
        id: 1,
        nickname: 'kong1',
        rank: 1,
        profileImageSignedURL: null,
      },
      {
        id: 2,
        nickname: 'kong2',
        rank: 2,
        profileImageSignedURL: null,
      },
      {
        id: 3,
        nickname: 'kong3',
        rank: null,
        profileImageSignedURL: null,
      },
    ],
  ],
  [2, []],
  [3, []],
  [4, []],
]);

export const getParticipants = createMockHandler<{
  participationAppliedMemberList: ParticipantInfo[];
}>({
  method: 'get',
  endpoint: '/gather-articles/:articleId([0-9]+)/participation',
  handler: ({ params }) => {
    const articleId = Number(params.articleId);

    const article = GATHER_ARTICLE_MOCK_DATA.find(
      (article) => article.id === articleId,
    );

    if (!article) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '해당 모집글이 존재하지 않습니다.',
        },
        { status: 404 },
      );
    }

    const participants = participationMap.get(Number(articleId)) || [];

    return HttpResponse.json({
      status: 'success',
      data: {
        participationAppliedMemberList: participants,
      },
      message: '해당 모집글의 참가 신청 목록을 성공적으로 조회했습니다.',
    });
  },
});

export const applyParticipation = createMockHandler<null>({
  method: 'post',
  endpoint: '/gather-articles/:articleId([0-9]+)/participation',
  handler: ({ params }) => {
    const articleId = Number(params.articleId);

    const article = GATHER_ARTICLE_MOCK_DATA.find(
      (article) => article.id === articleId,
    );

    if (!article) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '해당 모집글이 존재하지 않습니다.',
        },
        { status: 404 },
      );
    }

    const participants = participationMap.get(Number(articleId)) || [];

    const loggedInUserInfo = getLoggedInUserInfo();

    const newParticipation = {
      id: participants.length + 1,
      nickname: loggedInUserInfo?.nickname ?? 'user',
      rank: null,
      profileImageSignedURL: loggedInUserInfo?.profileImageSignedURL ?? null,
    };

    participants.push(newParticipation);
    participationMap.set(Number(articleId), participants);

    return HttpResponse.json({
      status: 'success',
      data: null,
      message: '해당 모집글에 참가 신청이 완료되었습니다.',
    });
  },
});

export const cancelParticipation = createMockHandler<null>({
  method: 'put',
  endpoint: '/gather-articles/:articleId([0-9]+)/participation',
  handler: ({ params }) => {
    const articleId = Number(params.articleId);

    const article = GATHER_ARTICLE_MOCK_DATA.find(
      (article) => article.id === articleId,
    );

    if (!article) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '해당 모집글이 존재하지 않습니다.',
        },
        { status: 404 },
      );
    }

    const participants = participationMap.get(Number(articleId)) || [];

    const loggedInUserInfo = getLoggedInUserInfo();

    const updatedParticipants = participants.filter(
      (participation) =>
        participation.nickname !== (loggedInUserInfo?.nickname ?? 'user'),
    );

    participationMap.set(articleId, updatedParticipants);

    return HttpResponse.json({
      status: 'success',
      data: null,
      message: '해당 모집글의 참가 신청을 취소했습니다.',
    });
  },
});

export const approveParticipation = createMockHandler<null>({
  method: 'put',
  endpoint:
    '/gather-articles/:articleId([0-9]+)/participation/:participationId([0-9]+)/approval',
  handler: ({ request, params }) => {
    const url = new URL(request.url);
    const applicantNickname = url.searchParams.get('applicantNickname');

    const articleId = Number(params.articleId);

    const article = GATHER_ARTICLE_MOCK_DATA.find(
      (article) => article.id === articleId,
    );

    if (!article) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '해당 모집글이 존재하지 않습니다.',
        },
        { status: 404 },
      );
    }

    const participants = participationMap.get(Number(articleId)) || [];

    if (participants) {
      const updatedParticipants = participants.filter(
        (member) => member.nickname !== applicantNickname,
      );

      participationMap.set(articleId, updatedParticipants);

      return HttpResponse.json({
        status: 'success',
        data: null,
        message: `${applicantNickname}님의 참가 신청을 승인했습니다.`,
      });
    }
  },
});

export const rejectParticipation = createMockHandler<null>({
  method: 'put',
  endpoint:
    '/gather-articles/:articleId([0-9]+)/participation/:participationId([0-9]+)/rejection',
  handler: ({ request, params }) => {
    const url = new URL(request.url);
    const applicantNickname = url.searchParams.get('applicantNickname');

    const articleId = Number(params.articleId);

    const article = GATHER_ARTICLE_MOCK_DATA.find(
      (article) => article.id === articleId,
    );

    if (!article) {
      return HttpResponse.json(
        {
          status: 'failure',
          data: null,
          message: '해당 모집글이 존재하지 않습니다.',
        },
        { status: 404 },
      );
    }

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
});

export const participationHandlers = [
  getParticipants,
  applyParticipation,
  approveParticipation,
  rejectParticipation,
  cancelParticipation,
];
