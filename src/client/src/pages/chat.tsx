import { ChatWindow } from "../components/chat/chat-window.tsx";
import { Chatbar } from "../components/chat/chatbar.tsx";
import { useFetcher } from "react-router";
import { ChatData } from "../types/chat-types.ts";

export function Chat() {
  const fetcher = useFetcher<ChatData>();
  return (
    <fetcher.Form method={"post"} className={"h-full flex flex-col"}>
      <div
        className={
          "grow overflow-y-scroll p-3 mask-b-from-black mask-b-from-90% mask-b-to-transparent"
        }
      >
        <div className={"w-6/12 mx-auto"}>
          <ChatWindow messages={fetcher.data?.messages} />
        </div>
      </div>
      <Chatbar />
    </fetcher.Form>
  );
}
