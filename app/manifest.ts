import type { MetadataRoute } from "next";

import { getDictionary } from "@/lib/i18n";
import { defaultLocale } from "@/types";

export default function manifest(): MetadataRoute.Manifest {
  const dict = getDictionary(defaultLocale);

  return {
    name: dict.meta.siteName,
    short_name: dict.meta.siteName,
    description: dict.meta.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1b5754",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
