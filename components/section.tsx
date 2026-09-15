import { Container } from "@/components/container";
import { cn } from "@/lib/utils";

/**
 * A titled band of page. Every home-page section and every sub-page heading
 * goes through this, which is what keeps vertical rhythm and heading levels
 * consistent without each page restating them.
 */
export function Section({
  id,
  eyebrow,
  title,
  body,
  tone = "default",
  align = "start",
  headingLevel = "h2",
  actions,
  children,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  body?: string;
  tone?: "default" | "muted" | "dark";
  align?: "start" | "center";
  headingLevel?: "h1" | "h2";
  actions?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  const Heading = headingLevel;

  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-24",
        tone === "muted" && "bg-ink-50",
        tone === "dark" && "bg-ink-900 text-ink-100",
        className,
      )}
    >
      <Container>
        {(eyebrow || title || body || actions) && (
          <div
            className={cn(
              "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
              align === "center" && "sm:flex-col sm:items-center",
            )}
          >
            <div className={cn("max-w-2xl", align === "center" && "text-center")}>
              {eyebrow && (
                <p
                  className={cn(
                    "text-xs font-semibold uppercase tracking-[0.18em]",
                    tone === "dark" ? "text-brand-300" : "text-brand-600",
                  )}
                >
                  {eyebrow}
                </p>
              )}
              {title && (
                <Heading
                  className={cn(
                    "text-balance font-semibold tracking-tight",
                    headingLevel === "h1"
                      ? "text-4xl sm:text-5xl"
                      : "text-3xl sm:text-4xl",
                    eyebrow && "mt-3",
                    tone === "dark" ? "text-white" : "text-ink-900",
                  )}
                >
                  {title}
                </Heading>
              )}
              {body && (
                <p
                  className={cn(
                    "mt-4 text-lg leading-relaxed",
                    tone === "dark" ? "text-ink-200" : "text-ink-600",
                  )}
                >
                  {body}
                </p>
              )}
            </div>
            {actions && <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>}
          </div>
        )}
        {children && <div className={cn(title || body ? "mt-12" : "")}>{children}</div>}
      </Container>
    </section>
  );
}
