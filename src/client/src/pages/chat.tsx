import { mockChat } from "../types/chat-types.ts";
import { ChatWindow } from "../components/chat/chat-window.tsx";

export function Chat() {
  return (
    <div className={"w-6/12 mx-auto"}>
      <ChatWindow messages={mockChat.messages} />
    </div>
  );
}
