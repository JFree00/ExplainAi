export enum Sender {
  User = "User",
  System = "System",
}
export interface DatabaseUser {
  id: number;
}

export interface DatabaseChat {
  id: string;
  title: string;
  createdAt: Date;
}

export interface DatabaseMessage {
  id: string;
  sender: Sender;
  chat_id: string;
  content: string;
  createdAt: Date;
}
