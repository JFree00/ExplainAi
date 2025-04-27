import { useEffect, useRef, useState } from "react";
import type { ChatMessage } from "../../types/chat-types";
import Markdown from "react-markdown";

interface SystemChatProps {
  content: ChatMessage["content"];
}

export function SystemChat({ content }: SystemChatProps) {
  const [displayedContent, setDisplayedContent] = useState<string>("");
  const [fullResponse, setFullResponse] = useState<string>("");
  // ref to hold the latest fullResponse value for the interval
  const fullResponseRef = useRef(fullResponse);
  // ref to track the index of the next word to be added from fullResponse
  const currentWord = useRef(0);
  // ref for the interval ID
  const interval = useRef<NodeJS.Timeout | null>(null);
  // ref to track if the stream reading is active
  const isReadingRef = useRef(false);
  useEffect(() => {
    fullResponseRef.current = fullResponse;
  }, [fullResponse]);

  const incrementWord = () => {
    if (interval.current) return;

    interval.current = setInterval(() => {
      const currentFullResponse = fullResponseRef.current;
      const words = currentFullResponse.trim().split(/(\s+)/);
      const wordIndex = currentWord.current;

      if (wordIndex < words.length) {
        setDisplayedContent((prev) => prev + words[wordIndex]);
        currentWord.current++;
      } else {
        if (interval.current) {
          clearInterval(interval.current);
          interval.current = null;
        }
      }
    }, TYPEWRITER_DELAY);
  };

  useEffect(() => {
    setDisplayedContent("");
    setFullResponse("");
    fullResponseRef.current = "";
    currentWord.current = 0;
    isReadingRef.current = false;
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }

    if (typeof content === "string") {
      setFullResponse(content);
      incrementWord();
    } else if (content instanceof ReadableStream) {
      const reader = content.getReader();
      const decoder = new TextDecoder();
      isReadingRef.current = true;

      const readStream = async () => {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              isReadingRef.current = false;
              const finalChunk = decoder.decode();
              if (finalChunk) {
                setFullResponse((prev) => prev + finalChunk);
              }
              incrementWord();
              break;
            }
            const chunk = decoder.decode(value, { stream: true });
            setFullResponse((prev) => prev + chunk);
            incrementWord();
          }
        } catch (error) {
          console.error("Error reading stream:", error);
          isReadingRef.current = false;
          incrementWord();
        }
      };

      readStream();

      // cleanup
      return () => {
        reader
          .cancel()
          .catch((err) => console.error("Error cancelling reader:", err));
        isReadingRef.current = false;
        if (interval.current) {
          clearInterval(interval.current);
          interval.current = null;
        }
      };
    } else {
      isReadingRef.current = false;
    }

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
        interval.current = null;
      }
    };
  }, [content]);
  return (
    <div className={"prose prose-invert text-white w-full max-w-full"}>
      <Markdown>{displayedContent}</Markdown>
    </div>
  );
}
