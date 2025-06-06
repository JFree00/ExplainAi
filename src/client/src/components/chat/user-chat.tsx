interface UserChatProps {
  content: string;
}
export function UserChat({ content }: UserChatProps) {
  return (
    <p className={"rounded-2xl bg-primary p-2.5 justify-self-end"}>{content}</p>
  );
}
