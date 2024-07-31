export interface Message {
  messageType: 'talk' | 'enter' | 'exit';
  nickname?: string;
  rank?: number | null;
  profileImageS3SavedURL?: string | null;
  content: string;
  sentAt?: string;
}

export interface ChatRoom {
  chatRoomId: number;
  gatherArticleSimpleInfo: ArticleSimpleInfo;
  lastChatMessageInfo: LastChatMessageInfo;
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

export interface LastChatMessageInfo {
  content: string;
  sentAt: string;
}
