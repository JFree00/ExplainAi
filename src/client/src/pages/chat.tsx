import { mockChat } from "../types/chat-types.ts";
import { ChatWindow } from "../components/chat/chat-window.tsx";

export function Chat() {
  return (
    <div className={"px-5"}>
      <ChatWindow messages={mockChat.messages} />
    </div>
  );
}
