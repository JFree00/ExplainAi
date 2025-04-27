import Markdown from "react-markdown";
import { ChatMessage } from "../../types/chat-types";

interface SystemChatProps {
  content: ChatMessage["content"];
}

export function SystemChat({ content }: SystemChatProps) {
  return (
    <div className={"prose prose-invert text-white w-full max-w-full"}>
      <Markdown>{content}</Markdown>
    </div>
  );
}
