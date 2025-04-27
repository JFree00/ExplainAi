import { ChatData } from "../../types/chat-types.ts";
import { SidebarButton } from "./sidebar-button.tsx";

interface SidebarProps {
  chats?: ChatData[];
}
export function Sidebar({ chats }: SidebarProps) {
  const sidebarChats = chats?.map((chat) => {
    return (
      <li className={""}>
        <SidebarButton to={"/"}>
          {(chat.title ?? chat.messages)
            ? (chat.messages![0].content as string).slice(0, 40)
            : "New Chat"}
        </SidebarButton>
      </li>
    );
  });
  return (
    <aside className={"w-1/7 font-semibold p-5 h-screen bg-secondary"}>
      <div className={"my-20 mask-alpha"}>
        <SidebarButton className={"capitalize"} to={"/"}>
          create a new chat
        </SidebarButton>
      </div>
      <p className={"capitalize px-2 my-2 text-sm"}>previous chats</p>
      <ul>{sidebarChats}</ul>
    </aside>
  );
}
