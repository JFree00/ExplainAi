import { Chat, Sender } from "../../types/chat-types.ts";
import { UserChat } from "./user-chat.tsx";

export function ChatWindow({ messages }: Chat) {
  const ChatUI = messages.map((message) => {
    return (
      <li>
        {message.user === Sender.User ? (
          <UserChat content={message.content} />
        ) : (
          <p>{message.content}</p>
        )}
      </li>
    );
  });
  return (
    <section>
      <h1 className={"sr-only"}>Explain AI chat history</h1>
      <ul className={"flex flex-col"}>{ChatUI}</ul>
    </section>
  );
}
