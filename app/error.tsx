"use client";

import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/button";
import { Container } from "@/components/container";

/**
 * Route-level error boundary. Copy is English-only: the boundary renders when
 * the server render failed, which is exactly when the locale lookup cannot be
 * relied upon.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Route error", error);
  }, [error]);

  return (
    <Container width="narrow" className="py-24 text-center sm:py-32">
      <AlertTriangle aria-hidden className="mx-auto h-10 w-10 text-sand-500" />
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink-900">
        Something went wrong
      </h1>
      <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-ink-600">
        This page could not be loaded. Trying again often resolves it; if it does
        not, the contact form still works.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button href="/" variant="secondary">
          Back to home
        </Button>
      </div>
    </Container>
  );
}
