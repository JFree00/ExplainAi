import { ChatWindow } from "../components/ui/chat-window.tsx";
import { mockChat } from "../types/chat-types.ts";

export function Chat() {
  return (
    <div className={"px-5"}>
      <ChatWindow messages={mockChat.messages} />
    </div>
  );
}
