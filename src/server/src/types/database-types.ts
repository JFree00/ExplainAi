export enum Sender {
  User = "User",
  System = "System",
}
export interface DatabaseUser {
  id: number;
}

export interface DatabaseChat {
  id: number;
  title: string;
  createdAt: Date;
  user: string;
}

export interface DatabaseMessage {
  id: string;
  sender: Sender;
  chat_id: string;
  content: string;
  createdAt: Date;
}

export interface ChatMessage {
  content: string | ReadableStream<Uint8Array>;
  sender: Sender;
}

export interface ChatData {
  messages?: ChatMessage[];
  title?: string;
}
