import { ChatData, Sender } from "../../types/chat-types.ts";
import { UserChat } from "./user-chat.tsx";
import { SystemChat } from "./system-chat.tsx";

export function ChatWindow({ messages }: ChatData) {
  const ChatUI = messages?.map((message, index) => {
    return (
      <li key={index}>
        {message.sender === Sender.User ? (
          <UserChat content={message.content as string} />
        ) : (
          <SystemChat content={message.content} />
        )}
      </li>
    );
  });
  return (
    <section className={"max-h-10"}>
      <h1 className={"sr-only"}>Explain AI chat history</h1>
      <ul className={"flex flex-col gap-y-10 pb-20"}>{ChatUI}</ul>
    </section>
  );
}
