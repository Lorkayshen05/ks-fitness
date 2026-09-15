import { cn } from "@/lib/utils";

/** The shared surface: one border, one radius, one hover treatment. */
export function Card({
  as: Tag = "div",
  className,
  interactive = false,
  children,
}: {
  as?: "div" | "article" | "li";
  className?: string;
  interactive?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-6",
        interactive && "transition hover:border-brand-300 hover:shadow-lg hover:shadow-ink-900/5",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
