import { ChatWindow } from "../components/chat/chat-window.tsx";
import { Chatbar } from "../components/chat/chatbar.tsx";
import { useFetcher } from "react-router";
import { ChatData, ChatMessage, Sender } from "../types/chat-types.ts";
import { FormEvent, useEffect, useState } from "react";

export function Chat() {
  const fetcher = useFetcher<ChatData>();
  const [displayedMessages, setDisplayedMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    if (fetcher.data?.messages) {
      setDisplayedMessages(fetcher.data.messages);
    }
  }, [fetcher.data, fetcher.state]);

  const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
    const currentInput = inputValue.trim();
    if (!currentInput) {
      event?.preventDefault();
      return;
    }
    const userMessage: ChatMessage = {
      sender: Sender.User,
      content: currentInput,
    };
    setDisplayedMessages((prevMessage) => [...prevMessage, userMessage]);
    setInputValue("");
  };
  const isLoading = fetcher.state !== "idle";

  return (
    <fetcher.Form
      method={"post"}
      className={"h-full flex flex-col"}
      onSubmit={handleSubmit}
    >
      <div
        className={
          "grow overflow-y-scroll p-3 mask-b-from-black mask-b-from-90% mask-b-to-transparent"
        }
      >
        <div className={"w-6/12 mx-auto"}>
          <ChatWindow messages={displayedMessages} />
        </div>
      </div>
      <Chatbar
        inputValue={inputValue}
        onInputChange={setInputValue}
        isLoading={isLoading}
      />
    </fetcher.Form>
  );
}
