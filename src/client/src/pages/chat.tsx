import { mockChat } from "../types/chat-types.ts";
import { ChatWindow } from "../components/chat/chat-window.tsx";
import { Chatbar } from "../components/chat/chatbar.tsx";

export function Chat() {
  return (
    <div className={"h-full flex flex-col"}>
      <div className={"grow overflow-y-scroll p-3"}>
        <div className={"w-6/12 mx-auto"}>
          <ChatWindow messages={mockChat.messages} />
        </div>
      </div>
      <Chatbar />
    </div>
  );
}
