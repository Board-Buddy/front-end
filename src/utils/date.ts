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

export const formatRelativeTime = (createdAt: string) => {
  const now = new Date();
  const createdDate = new Date(createdAt);

  const diffInMilliseconds = Number(now) - Number(createdDate);
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
