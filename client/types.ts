export interface ChatMessageType {
  content?: string;
  own: boolean;
  attachments?: string[];
  type: 'text' | 'image' | 'file';
  user?: string | null;
}