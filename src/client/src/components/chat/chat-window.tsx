import { Chat, Sender } from "../../types/chat-types.ts";
import { UserChat } from "./user-chat.tsx";
import Markdown from "react-markdown";

export function ChatWindow({ messages }: Chat) {
  const ChatUI = messages.map((message) => {
    return (
      <li>
        {message.user === Sender.User ? (
          <UserChat content={message.content} />
        ) : (
          <div className={"prose prose-invert text-white"}>
            <Markdown>{message.content}</Markdown>
          </div>
        )}
      </li>
    );
  });
  return (
    <section className={"max-h-10"}>
      <h1 className={"sr-only"}>Explain AI chat history</h1>
      <ul className={"flex flex-col gap-y-10"}>{ChatUI}</ul>
    </section>
  );
}
