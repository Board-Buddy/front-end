export interface Message {
  id: number;
  content: string;
  messageType: 'TALK' | 'ENTER' | 'EXIT';
  sentAt: string;
  nickname?: string;
  rank?: number | null;
  profileImageS3SavedURL?: string | null;
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
