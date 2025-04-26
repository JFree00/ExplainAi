import { Link, LinkProps } from "react-router";
import { cn } from "../../utils";

export function SidebarButton({ children, className, ...props }: LinkProps) {
  return (
    <Link
      className={cn(
        className,
        "capitalize p-2 rounded-md hover:bg-zinc-800 flex  line-clamp-1 whitespace-nowrap mask-alpha",
      )}
      {...props}
    >
      <div
        className={"mask-r-from-black mask-r-from-90% mask-r-to-transparent"}
      >
        {children}
      </div>
    </Link>
  );
}
