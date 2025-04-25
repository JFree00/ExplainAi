export function Chatbar() {
  return (
    <div
      className={
        "outline-1 bg-primary outline-secondary rounded-2xl p-2 sticky top-10/12 flex gap-x-5"
      }
    >
      <textarea
        className={"active: outline-0 w-full resize-none"}
        placeholder={"Explain this..."}
      ></textarea>
      <button>Send</button>
    </div>
  );
}
