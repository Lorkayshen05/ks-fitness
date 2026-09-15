import { cn } from "@/lib/utils";

/**
 * Renders the small subset of Markdown the seeded articles use — `## ` headings,
 * `- ` bullets, blank-line-separated paragraphs — plus bare URLs as links.
 *
 * A full Markdown parser would be a dependency and an HTML-injection surface
 * for the sake of four constructs. Nothing here ever renders raw HTML: every
 * value goes through React as text.
 */

const URL_PATTERN = /(https?:\/\/[^\s)]+)/g;

function linkify(text: string, keyPrefix: string) {
  return text.split(URL_PATTERN).map((part, index) =>
    URL_PATTERN.test(part) ? (
      <a
        key={`${keyPrefix}-${index}`}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all font-medium text-brand-700 underline underline-offset-2 hover:text-brand-800"
      >
        {part}
      </a>
    ) : (
      <span key={`${keyPrefix}-${index}`}>{part}</span>
    ),
  );
}

export function Prose({ content, className }: { content: string; className?: string }) {
  const blocks = content.trim().split(/\n{2,}/);

  return (
    <div className={cn("space-y-6", className)}>
      {blocks.map((block, index) => {
        const key = `block-${index}`;

        if (block.startsWith("## ")) {
          return (
            <h2 key={key} className="pt-4 text-2xl font-semibold tracking-tight text-ink-900">
              {block.slice(3)}
            </h2>
          );
        }

        if (block.startsWith("- ")) {
          const items = block.split("\n").filter((line) => line.startsWith("- "));
          return (
            <ul key={key} className="space-y-3 pl-1">
              {items.map((item, itemIndex) => (
                <li key={`${key}-${itemIndex}`} className="flex gap-3 text-ink-700">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                  <span className="leading-relaxed">{linkify(item.slice(2), `${key}-${itemIndex}`)}</span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={key} className="text-lg leading-relaxed text-ink-700">
            {linkify(block, key)}
          </p>
        );
      })}
    </div>
  );
}
