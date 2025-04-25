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
  title?: string;
}
export const mockChat: Chat = {
  messages: [
    {
      content: "Hello, world!",
      user: Sender.User,
    },
    {
      content:
        'The content is a line of JavaScript code that will print the message "hello world" to the console. It\'s a common introductory programming example used to demonstrate basic syntax and output.\n',
      user: Sender.System,
    },
    {
      content: "Okay!",
      user: Sender.User,
    },
  ],
};
