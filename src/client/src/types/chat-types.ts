export enum Sender {
  User,
  System,
}
export interface ChatMessage {
  content: string;
  user: Sender;
}

export interface Chat {
  messages: ChatMessage[];
}

export const mockChat: Chat = {
  messages: [
    {
      content: "Hello, world!",
      user: Sender.User,
    },
    {
      content: "Hello, world!",
      user: Sender.System,
    },
    {
      content: "Hello, world!",
      user: Sender.User,
    },
  ],
};
