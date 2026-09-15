import { Container } from "@/components/container";

/**
 * The shared loading skeleton for the index routes. It mirrors the page rhythm
 * — heading band, then a card grid — so nothing shifts when the data arrives.
 */
export function PageSkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading</span>
      <div className="border-b border-ink-200 bg-ink-50 py-16 sm:py-24">
        <Container>
          <div className="h-10 w-2/3 max-w-xl animate-pulse rounded bg-ink-200" />
          <div className="mt-5 h-4 w-full max-w-2xl animate-pulse rounded bg-ink-100" />
        </Container>
      </div>
      <Container className="py-12 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: cards }, (_, index) => (
            <div
              key={index}
              className="h-56 animate-pulse rounded-2xl border border-ink-200 bg-ink-50"
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
