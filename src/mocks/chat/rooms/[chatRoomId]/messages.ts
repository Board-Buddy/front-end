import { API_BASE_URL } from '@/constants/env';
import { http, HttpResponse } from 'msw';

export const getExistingMessages = http.get(
  `${API_BASE_URL}/chat/rooms/:chatRoomId([0-9]+)/messages`,
  () => {
    return HttpResponse.json({
      status: 'success',
      data: {
        chatMessages: [
          {
            content: '[입장] kong1님이 채팅방에 입장했습니다.',
            messageType: 'enter',
          },
          {
            content: '메시지 입니다.',
            nickname: 'yubin',
            profileImageS3SavedURL: null,
            rank: 2,
            messageType: 'TALK',
            sentAt: '2024-07-30 12:33',
          },
          {
            content: '메시지 입니다.',
            nickname: 'kong3',
            profileImageS3SavedURL: null,
            rank: 2,
            messageType: 'TALK',
            sentAt: '2024-07-30 12:33',
          },
          {
            content: '전송 메시지',
            nickname: 'yubin',
            profileImageS3SavedURL: null,
            rank: 2,
            messageType: 'TALK',
            sentAt: '2024-07-30 12:33',
          },
          {
            content: '[퇴장] kong1님이 채팅방에서 퇴장했습니다.',
            messageType: 'EXIT',
          },
          {
            content:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not',
            nickname: 'kong3',
            profileImageS3SavedURL: null,
            rank: 2,
            messageType: 'TALK',
            sentAt: '2024-07-30 12:33',
          },
          {
            content:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not',
            nickname: 'kong3',
            profileImageS3SavedURL: null,
            rank: 2,
            messageType: 'TALK',
            sentAt: '2024-07-30 12:33',
          },
        ],
      },
      message: '채팅 메세지들의 정보들을 성공적으로 조회했습니다.',
    });
  },
);
