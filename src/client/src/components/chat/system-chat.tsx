import Markdown from "react-markdown";
import { ChatMessage } from "../../types/chat-types";
import { useEffect, useRef, useState } from "react";

interface SystemChatProps {
  content: ChatMessage["content"];
}

export function SystemChat({ content }: SystemChatProps) {
  const [displayedContent, setDisplayedContent] = useState<string>("");
  const [fullResponse, setFullResponse] = useState<string>("");
  const currentWord = useRef(0);
  const interval = useRef<NodeJS.Timeout>(null);
  const incrementWord = () => {
    if (interval.current) return;
    interval.current = setInterval(() => {
      const words = fullResponse.trim().split(/(\s+)/);
      if (currentWord.current < words.length) {
        setDisplayedContent((prev) => prev + words[currentWord.current]);
        currentWord.current++;
      } else {
        if (interval.current) {
          clearInterval(interval.current);
          interval.current = null;
        }
      }
    }, 50);
  };
  useEffect(() => {
    if (typeof content === "string") {
      setFullResponse(content);
      incrementWord();
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
              incrementWord();
              break;
            }
            const chunk = decoder.decode(value, { stream: true });
            setFullResponse((prev) => prev + chunk);
            incrementWord();
          }
        } catch (error) {
          console.error(error);
          incrementWord();
        }
      };
      readStream();
      return () => {
        reader.cancel();
        reading = false;
        if (interval.current) {
          clearInterval(interval.current);
          interval.current = null;
        }
      };
    }
  }, [content]);
  useEffect(() => {
    incrementWord();
  }, [fullResponse]);
  return (
    <div className={"prose prose-invert text-white w-full max-w-full"}>
      <Markdown>{displayedContent}</Markdown>
    </div>
  );
}
