export interface ChatMessageType {
  content?: string;
  own?: boolean;
  attachments?: string[];
  type: 'text' | 'image' | 'system';
  user?: {
    name: string;
    id: string;
  
  };
}