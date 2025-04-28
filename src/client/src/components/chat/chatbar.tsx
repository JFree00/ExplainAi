import * as React from "react";
import { KeyboardEvent, useRef } from "react";

interface ChatbarProps {
  isLoading: boolean;
  inputValue: string;
  onInputChange: (value: string) => void;
}

export function Chatbar({
  inputValue,
  isLoading,
  onInputChange,
}: ChatbarProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onInputChange(event.target.value);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
    }
  };

  return (
    <div
      className={
        "outline-1 bg-primary outline-secondary rounded-2xl mx-100 mb-20 p-2 grid grid-cols-12 grid-rows-[1fr] gap-x-5"
      }
    >
      <textarea
        name={"message"}
        className={
          "col-span-11 active: outline-0 w-full resize-none h-auto overflow-y-hidden box-border self-start"
        }
        ref={ref}
        placeholder={"Explain this..."}
        onInput={() => {
          ref.current!.style.height = "auto";
          ref.current!.style.height = ref.current!.scrollHeight + "px";
        }}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        rows={1}
      ></textarea>
      <button
        type={"submit"}
        className={"row-start-2 col-start-12 cursor-pointer"}
        disabled={isLoading || !inputValue.trim()}
      >
        Ask
      </button>
    </div>
  );
}
