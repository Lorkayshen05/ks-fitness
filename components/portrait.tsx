import { cn } from "@/lib/utils";

/**
 * Trainer portrait. Renders the real photo when `src` is set on the trainer
 * record, and a branded initials tile otherwise — so the layout is final even
 * before photography exists.
 */
export function Portrait({
  initials,
  gradient,
  src,
  alt,
  className,
  textClass = "text-3xl",
}: {
  initials: string;
  gradient: string;
  src?: string;
  alt: string;
  className?: string;
  textClass?: string;
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- portraits may be remote; next/image would need per-host config.
      <img src={src} alt={alt} className={cn("h-full w-full object-cover", className)} />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "flex h-full w-full items-center justify-center bg-gradient-to-br",
        gradient,
        className,
      )}
    >
      <span className={cn("font-extrabold tracking-tight text-white/90", textClass)}>
        {initials}
      </span>
    </div>
  );
}
