export interface Message {
  messageType: 'TALK' | 'ENTER' | 'EXIT';
  nickname?: string;
  rank?: number | null;
  profileImageS3SavedURL?: string | null;
  content: string;
  sentAt?: string;
}

export interface ChatRoom {
  chatRoomId: number;
  gatherArticleSimpleInfo: ArticleSimpleInfo;
  latestChatMessageInfo: LatestChatMessageInfo;
}

export interface ArticleSimpleInfo {
  gatherArticleId?: number;
  title: string;
  meetingLocation: string;
  maxParticipants?: number;
  currentParticipants: number;
  startDateTime?: string;
  endDateTime?: string;
}

export interface LatestChatMessageInfo {
  content: string;
  sentAt: string;
}
