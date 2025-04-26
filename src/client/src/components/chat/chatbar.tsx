import { useRef } from "react";

export function Chatbar() {
  const ref = useRef<HTMLTextAreaElement>(null);
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
        rows={1}
      ></textarea>
      <button
        type={"submit"}
        className={"row-start-2 col-start-12 cursor-pointer"}
      >
        Ask
      </button>
    </div>
  );
}
