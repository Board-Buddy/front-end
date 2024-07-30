export interface Message {
  messageType: 'talk' | 'enter' | 'exit';
  nickname?: string;
  rank?: number | null;
  profileImageS3SavedURL?: string | null;
  content: string;
  sentAt?: string;
}
