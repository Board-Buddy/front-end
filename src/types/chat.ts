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
  gatherArticleId: number;
  title: string;
  participants: number;
  meetingLocation: string;
  lastMessage: {
    content: string;
    sentAt: string;
  };
}

export interface ArticlePreview {
  title: string;
  meetingLocation: string;
  maxParticipants: number;
  currentParticipants: number;
  startDateTime: string;
  endDateTime: string;
}
