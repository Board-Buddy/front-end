export const formatMeetingTime = (startTime: string, endTime: string) => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const month = start.getMonth() + 1;
  const day = start.getDate();

  let startHours = start.getHours();
  let endHours = end.getHours();

  const duration = endHours - startHours;

  const ampm = startHours >= 12 ? '오후' : '오전';

  startHours = startHours % 12 ? startHours % 12 : 12;
  endHours = endHours % 12 ? endHours % 12 : 12;

  const formattedDate = `${month}월 ${day}일 ${ampm} ${startHours}시 - ${endHours}시 (${duration}시간)`;

  return formattedDate;
};

/** 상대 시간 반환 함수(모집글) */
export const formatRelativeTime = (createdAt: string) => {
  const now = new Date();
  const createdDate = new Date(createdAt);

  const diffInMilliseconds = now.getTime() - createdDate.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));

  if (diffInMinutes < 1) {
    return '방금 전';
  }
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  // 날짜 형식 포맷
  const year = createdDate.getFullYear();
  const month = createdDate.getMonth() + 1;
  const day = createdDate.getDate();
  return `${year}년 ${month}월 ${day}일`;
};

/** 댓글 작성 일시 포맷 */
export const commentTime = (createdAt: string) => {
  const date = new Date(createdAt);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${year}/${month}/${day} · ${hours}:${minutes}`;
};

/** 현재 연월 가져오기 */
export const getCurrentYearAndMonth = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year} ${month}`;
};

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}/${month}/${day}`;
};

/** 한달 뒤 날짜 반환 함수 */
export const oneMonthLater = () => {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  return date;
};

/** 하루 전 날짜 반환 함수 */
export const getYesterday = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
};

/** 2024-07-20 11:00 형태로 변환
 * @param date Date 객체
 * @param hour 시
 * @param minute 분
 */
export const formatDateTime = (
  date: Date,
  hour: number | string,
  minute: number | string,
) => {
  const dateTime = date;
  dateTime.setHours(typeof hour === 'number' ? hour : parseInt(hour, 10));
  dateTime.setMinutes(
    typeof minute === 'number' ? minute : parseInt(minute, 10),
  );

  // 날짜 포맷팅
  const formattedDate = dateTime
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\./g, '-')
    .replace(/\s/g, '')
    .slice(0, -1);

  // 시간 포맷팅
  const formattedTime = dateTime
    .toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace(/\./g, '');

  // 포맷팅된 날짜와 시간
  const formattedDateTime = `${formattedDate} ${formattedTime}`;

  return formattedDateTime;
};

/** startHour, startMinute, endHour, endMinute 반환 함수 */
export const getTimeFormParameters = (
  startDateTime: string,
  endDateTime: string,
) => {
  const startDate = new Date(startDateTime);
  const endDate = new Date(endDateTime);

  const startHour = startDate.getHours().toString();
  const startMinute = startDate.getMinutes().toString();

  const endHour = endDate.getHours().toString();
  const endMinute = endDate.getMinutes().toString();

  return { startHour, startMinute, endHour, endMinute };
};

/** 상대 시간 반환 함수(채팅) */
export const getLastMessageSentTime = (sentTime: string) => {
  const date = new Date(sentTime);
  const now = new Date();

  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  const diffInWeeks = Math.floor(
    diffInMilliseconds / (1000 * 60 * 60 * 24 * 7),
  );

  if (diffInMinutes < 1) {
    return '방금 전';
  }
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }
  if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  }
  return `${diffInWeeks}주 전`;
};

/** 채팅 메시지 시간 포맷팅 함수 */
export const formatSentAt = (sentAt: string) => {
  const date = new Date(sentAt);

  let hours = date.getHours();
  const minutes = date.getMinutes();

  const ampm = hours >= 12 ? '오후' : '오전';
  hours = hours % 12 ? hours % 12 : 12;

  return `${ampm} ${hours}:${minutes}`;
};

/** 예상 시작 시간과 종료 시간이 올바르게 입력되었는지 확인 */
export const isValidTimeRange = (
  date: Date,
  startHour: string,
  startMinute: string,
  endHour: string,
  endMinute: string,
) => {
  if (
    startHour === '' ||
    startMinute === '' ||
    endHour === '' ||
    endMinute === ''
  ) {
    return '시간을 모두 입력해주세요.';
  }

  const startHourValue = parseInt(startHour, 10);
  const endHourValue = parseInt(endHour, 10);
  const startMinuteValue = parseInt(startMinute, 10);
  const endMinuteValue = parseInt(endMinute, 10);

  // 시작 시간이 종료 시간보다 늦은 경우
  if (
    startHourValue > endHourValue ||
    (startHourValue === endHourValue && startMinuteValue >= endMinuteValue)
  ) {
    return '모임 시작 예상 시간이 종료 시간보다 늦습니다.';
  }

  // 현재 시각보다 시작 시간이 빠른 경우
  const now = new Date();
  const setDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    startHourValue,
    startMinuteValue,
  );

  if (setDate <= now) {
    return '모임 시작 예상 시간이 현재 시간보다 빠릅니다.';
  }

  return null;
};
