import { useRef } from "react";

export function Chatbar() {
  const ref = useRef<HTMLTextAreaElement>(null);
  return (
    <div
      className={
        "outline-1 bg-primary outline-secondary rounded-2xl mx-90 mb-20 p-2 flex items-end gap-x-5"
      }
    >
      <textarea
        className={
          "active: outline-0 w-full resize-none h-auto overflow-y-hidden box-border self-start"
        }
        ref={ref}
        placeholder={"Explain this..."}
        onInput={() => {
          ref.current!.style.height = "auto";
          ref.current!.style.height = ref.current!.scrollHeight + "px";
        }}
        rows={1}
      ></textarea>
      <button>Send</button>
    </div>
  );
}
