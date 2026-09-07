import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { LocaleProvider } from "@/lib/locale-context";

/**
 * Chrome for the KS Fitness site: every route in this group gets the navbar,
 * the footer and the locale switcher. Routes outside the group (such as
 * /gepuklah) render on their own.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <LocaleProvider>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </LocaleProvider>
  );
}
