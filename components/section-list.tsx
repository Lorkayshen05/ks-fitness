/**
 * Shared renderer for the prose pages (about, privacy, terms): a list of
 * titled sections, each a few paragraphs. Those three pages differ only in
 * which dictionary subtree they pass in.
 */
export function SectionList({
  items,
}: {
  items: { title: string; body: string[] }[];
}) {
  return (
    <div className="space-y-12">
      {items.map((item) => (
        <section key={item.title}>
          <h2 className="text-2xl font-semibold tracking-tight text-ink-900">
            {item.title}
          </h2>
          <div className="mt-4 space-y-4">
            {item.body.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-ink-700">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
