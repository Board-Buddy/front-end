import { API_BASE_URL } from '@/services/endpoint';
import { Message } from '@/types/chat';
import { http, HttpResponse } from 'msw';

const CHAT_MOCK_DATA: Message[] = [
  {
    id: 20001,
    content: '[입장] kong1님이 입장했습니다.',
    messageType: 'ENTER',
    sentAt: '2025-06-26T17:00:01.000',
  },
  {
    id: 20002,
    content: '안녕하세요! 참여 허락해주셔서 감사합니다 🙌',
    nickname: 'kong1',
    rank: 2,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:00:05.000',
  },
  {
    id: 20003,
    content: '환영해요! 편하게 즐기다 가세요~',
    nickname: 'hostUser',
    rank: 3,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:00:10.000',
  },
  {
    id: 20004,
    content: '혹시 모집하신 4명 외에 한 명 더 추가 가능할까요?',
    nickname: 'kong1',
    rank: 2,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:00:15.000',
  },
  {
    id: 20005,
    content: '음, 일단 지금까지는 4명으로 맞춰서 생각했어요.',
    nickname: 'hostUser',
    rank: 3,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:00:20.000',
  },
  {
    id: 20006,
    content: '다른 분들도 추가 인원 괜찮으신지 의견 들어볼게요.',
    nickname: 'hostUser',
    rank: 3,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:00:25.000',
  },
  {
    id: 20007,
    content: '[입장] yubin님이 입장했습니다.',
    messageType: 'ENTER',
    sentAt: '2025-06-26T17:00:30.000',
  },
  {
    id: 20008,
    content: '안녕하세요! 저도 초대해주셔서 감사해요 :)',
    nickname: 'yubin',
    rank: 2,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:00:35.000',
  },
  {
    id: 20009,
    content: '추가 인원 괜찮아요! 인원이 좀 더 많아도 재밌을 것 같아요.',
    nickname: 'yubin',
    rank: 2,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:00:40.000',
  },
  {
    id: 20010,
    content: '[입장] gomi님이 입장했습니다.',
    messageType: 'ENTER',
    sentAt: '2025-06-26T17:00:45.000',
  },
  {
    id: 20011,
    content: '안녕하세요! 인원 늘려도 괜찮은가요?',
    nickname: 'gomi',
    rank: 2,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:00:50.000',
  },
  {
    id: 20012,
    content: '저도 찬성입니다! 판데믹 5인 확장판 있으면 더 재밌을 거 같아요.',
    nickname: 'gomi',
    rank: 2,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:00:55.000',
  },
  {
    id: 20013,
    content: '좋네요! 다들 괜찮다 하니까 5명까지 확정할게요.',
    nickname: 'hostUser',
    rank: 3,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:01:00.000',
  },
  {
    id: 20014,
    content: '와 감사합니다! 친구 하나 더 데려갈 수 있겠네요.',
    nickname: 'kong1',
    rank: 2,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:01:05.000',
  },
  {
    id: 20015,
    content: '[입장] luna님이 입장했습니다.',
    messageType: 'ENTER',
    sentAt: '2025-06-26T17:01:10.000',
  },
  {
    id: 20016,
    content: '안녕하세요! 늦게 합류했네요 ㅎㅎ',
    nickname: 'luna',
    rank: 1,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:01:15.000',
  },
  {
    id: 20017,
    content: '반갑습니다! 오늘 어떤 게임들 하실 계획인가요?',
    nickname: 'luna',
    rank: 1,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:01:20.000',
  },
  {
    id: 20018,
    content: '기본은 판데믹이고, 다른 보드도 몇 개 준비할 예정이에요.',
    nickname: 'hostUser',
    rank: 3,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:01:25.000',
  },
  {
    id: 20019,
    content: '저는 협력 게임 좋아해서 판데믹 넘 기대돼요!',
    nickname: 'kong1',
    rank: 2,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:01:30.000',
  },
  {
    id: 20020,
    content: '저는 추리 쪽 좋아해요. 디셉션이나 코드네임도 좋아합니다.',
    nickname: 'yubin',
    rank: 2,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:01:35.000',
  },
  {
    id: 20021,
    content: '아, 저는 가볍게 할 수 있는 파티 게임도 환영입니다~',
    nickname: 'gomi',
    rank: 2,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:01:40.000',
  },
  {
    id: 20022,
    content: '[퇴장] luna님이 채팅방을 나갔습니다.',
    messageType: 'EXIT',
    sentAt: '2025-06-26T17:01:45.000',
  },
  {
    id: 20023,
    content: '아쉽네요 ㅠ 다음에 또 봐요!',
    nickname: 'kong1',
    rank: 2,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:01:50.000',
  },
  {
    id: 20024,
    content: '그럼 다들 시간 맞춰서 7시에 만나요!',
    nickname: 'hostUser',
    rank: 3,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:01:55.000',
  },
  {
    id: 20025,
    content: '네! 저도 늦지 않게 갈게요.',
    nickname: 'yubin',
    rank: 2,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:02:00.000',
  },
  {
    id: 20026,
    content: '판데믹 외에 다른 게임도 가져가면 좋겠네요.',
    nickname: 'gomi',
    rank: 2,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:02:05.000',
  },
  {
    id: 20027,
    content: '좋아요! 저는 코드네임 가져올게요.',
    nickname: 'kong1',
    rank: 2,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:02:10.000',
  },
  {
    id: 20028,
    content: '저도 가볍게 즐길 수 있는 카드게임 하나 준비할게요.',
    nickname: 'yubin',
    rank: 2,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:02:15.000',
  },
  {
    id: 20029,
    content: '오늘 정말 기대되네요~',
    nickname: 'hostUser',
    rank: 3,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:02:20.000',
  },
  {
    id: 20030,
    content: '다들 조심히 오세요!',
    nickname: 'kong1',
    rank: 2,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:02:25.000',
  },
  {
    id: 20031,
    content: '그럼 오늘 뵐게요 :)',
    nickname: 'gomi',
    rank: 2,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:02:30.000',
  },
  {
    id: 20032,
    content: '좋은 밤 되세요 모두~',
    nickname: 'hostUser',
    rank: 3,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:02:45.000',
  },
  {
    id: 20033,
    content: '내일도 좋은 하루 되세요!',
    nickname: 'yubin',
    rank: 2,
    messageType: 'TALK',
    sentAt: '2025-06-26T17:02:50.000',
  },
];

const CHAT_COUNT_PER_PAGE = 10;

const getNextCursor = (lastSeenMessage: Message) => {
  const sentAtEpoch = new Date(lastSeenMessage.sentAt).getTime();
  return `${sentAtEpoch}_${lastSeenMessage.id}`;
};

export const getExistingMessages = http.get(
  `${API_BASE_URL}/chat/messages/:chatRoomId([0-9]+)`,
  ({ request }) => {
    const url = new URL(request.url);
    const direction = url.searchParams.get('direction');
    const cursor = url.searchParams.get('cursor');

    if (direction === 'initial') {
      const dataList = CHAT_MOCK_DATA.slice(-CHAT_COUNT_PER_PAGE);
      const hasMore = CHAT_MOCK_DATA.slice(0, CHAT_COUNT_PER_PAGE).length > 0;

      return HttpResponse.json({
        status: 'success',
        data: {
          dataList,
          hasMore,
          nextCursor: hasMore
            ? getNextCursor(
                CHAT_MOCK_DATA[CHAT_MOCK_DATA.length - CHAT_COUNT_PER_PAGE],
              )
            : null,
        },
      });
    }

    if (direction === 'older') {
      if (!cursor) {
        return HttpResponse.json(
          {
            status: 'error',
            data: null,
            message:
              '서버 문제로 메시지를 조회하지 못하였습니다. 관리자에게 문의하세요',
          },
          { status: 500 },
        );
      }

      const cursorIndex = CHAT_MOCK_DATA.findIndex(
        (message) => cursor === getNextCursor(message),
      );

      const dataList = CHAT_MOCK_DATA.slice(
        cursorIndex + 1 < CHAT_COUNT_PER_PAGE
          ? 0
          : cursorIndex - CHAT_COUNT_PER_PAGE,
        cursorIndex,
      );

      const hasMore = cursorIndex + 1 > CHAT_COUNT_PER_PAGE;

      return HttpResponse.json({
        status: 'success',
        data: {
          dataList,
          hasMore,
          nextCursor: hasMore
            ? getNextCursor(
                CHAT_MOCK_DATA[
                  cursorIndex - CHAT_COUNT_PER_PAGE > 0
                    ? cursorIndex - CHAT_COUNT_PER_PAGE
                    : 0
                ],
              )
            : null,
        },
        message: '채팅 메세지들의 정보들을 성공적으로 조회했습니다.',
      });
    }
  },
);
