import Markdown from "react-markdown";
import { ChatMessage } from "../../types/chat-types";
import { useEffect, useState } from "react";

interface SystemChatProps {
  content: ChatMessage["content"];
}

export function SystemChat({ content }: SystemChatProps) {
  const [displayedContent, setDisplayedContent] = useState<string>("");
  useEffect(() => {
    if (typeof content === "string") {
      setDisplayedContent(content);
    } else if (content instanceof ReadableStream) {
      const reader = content.getReader();
      const decoder = new TextDecoder();
      let reading = true;
      const readStream = async () => {
        try {
          while (reading) {
            const { done, value } = await reader.read();
            if (done) {
              reading = false;
              break;
            } else {
              const chunk = decoder.decode(value, { stream: true });
              setDisplayedContent((prev) => prev + chunk);
            }
          }
        } catch (error) {
          console.error(error);
        }
      };
      readStream();
      return () => {
        reading = false;
      };
    }
  }, [content]);
  return (
    <div className={"prose prose-invert text-white w-full max-w-full"}>
      <Markdown>{displayedContent}</Markdown>
    </div>
  );
}
