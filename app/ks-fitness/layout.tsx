import type { Metadata } from "next";

/**
 * The KS Fitness landing page predates this repo's Gepuklah rebrand and is kept
 * here on its own route. It renders against a cool dark palette, so it opts out
 * of the warm charcoal body background set by the root layout.
 */
export const metadata: Metadata = {
  title: "KS Fitness — Landing Page",
  description: "Bilingual (EN / 简体中文) marketing site for the KS Fitness gym brand.",
};

export default function KsFitnessLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="min-h-screen bg-slate-950 text-slate-100">{children}</div>;
}
