export const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api`;
export const WS_BASE_URL = `${process.env.NEXT_PUBLIC_WS_SERVER_URL}/ws`;

export const ENDPOINT = {
  AUTH: {
    REGISTER: () => `/auth/register` as const,
    USERNAME_CHECK: () => `/auth/username/check` as const,
    NICKNAME_CHECK: () => `/auth/nickname/check` as const,
    SMS_CERTIFICATION: {
      SEND: () => `/auth/sms-certifications/send` as const,
      VERIFY: () => `/auth/sms-certifications/verify` as const,
    },
    LOGIN: () => `/auth/login` as const,
    SOCIAL_LOGIN: {
      GOOGLE: () => `/oauth2/authorization/google` as const,
      KAKAO: () => `/oauth2/authorization/kakao` as const,
      NAVER: () => `/oauth2/authorization/naver` as const,
      ADDITIONAL_CERTIFICATION: () => `/auth/oauth2/register` as const,
    },
    STATUS: () => `/auth/status` as const,
    PASSWORD_CERTIFICATION: () => `/auth/password` as const,
    LOGOUT: () => `/auth/logout` as const,
    WITHDRAWAL: () => `/auth/withdrawal` as const,
  },
  LOCATION: {
    SEARCH_FOR_SIGNUP: (keyword: string) =>
      `/auth/locations/search?emd=${keyword}` as const,
    SEARCH_BY_USER: (keyword: string) =>
      `/locations/search?emd=${keyword}` as const,
    PROVINCES: () => `/regions/provinces` as const,
    DISTRICTS: (provinceCode: string) =>
      `/regions/provinces/${provinceCode}/districts` as const,
  },
  MY: {
    GATHER_ARTICLES: () => `/my/gather-articles` as const,
    JOINED_ARTICLES: () => `/my/participations` as const,
    PROFILE: {
      UPDATE: () => `/profiles` as const,
    },
  },
  USER: {
    PROFILE: (nickname: string) => `/profiles/${nickname}` as const,
    BADGES: (nickname: string) => `/badges/${nickname}` as const,
  },
  GATHER_ARTICLE: {
    LIST: () => `/gather-articles` as const,
    DETAIL: (articleId: number) => `/gather-articles/${articleId}` as const,
    SEARCH: () => `/gather-articles/search` as const,
    COMMENT: {
      LIST: (articleId: number, parentId?: number) => {
        return parentId
          ? `/gather-articles/${articleId}/comments/${parentId}`
          : `/gather-articles/${articleId}/comments`;
      },
      DETAIL: (articleId: number, commentId: number) =>
        `/gather-articles/${articleId}/comments/${commentId}` as const,
    },
    PARTICIPATION: {
      STATUS: (articleId: number) =>
        `/gather-articles/${articleId}/participation-status` as const,
      APPLICATION: (articleId: number) =>
        `/gather-articles/${articleId}/participation` as const,
      APPROVAL: (
        articleId: number,
        applicantId: number,
        applicantNickname: string,
      ) =>
        `/gather-articles/${articleId}/participation/${applicantId}/approval?applicantNickname=${applicantNickname}` as const,
      REJECTION: (
        articleId: number,
        applicantId: number,
        applicantNickname: string,
      ) =>
        `/gather-articles/${articleId}/participation/${applicantId}/rejection?applicantNickname=${applicantNickname}` as const,
    },
    REVIEWS: (articleId: number) => `/reviews/${articleId}` as const,
  },
  CHAT_ROOM: {
    LIST: () => `/chat/rooms` as const,
    DETAIL: {
      MESSAGES: (roomId: number) => `/chat/messages/${roomId}` as const,
      GATHER_ARTICLE_INFO: (roomId: number, articleId: number) =>
        `/chat/rooms/${roomId}/gather-articles/${articleId}` as const,
      CONNECTION: () => `/chat/connection` as const,
      MESSAGE_PUBLICATION: (roomId: number) =>
        `/chat/messages/publication/${roomId}` as const,
      MESSAGE_SUBSCRIPTION: (roomId: number) =>
        `/chat/messages/subscription/${roomId}` as const,
    },
  },
  NOTIFICATION: {
    LIST: () => `/notifications` as const,
    SUBSCRIPTION: () => `/notifications/subscription` as const,
  },
  RANKINGS: () => `/rankings` as const,
  BOARD_CAFES: () => `/board-cafes` as const,
};
