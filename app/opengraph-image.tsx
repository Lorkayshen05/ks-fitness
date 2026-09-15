import { ImageResponse } from "next/og";

import { getDictionary } from "@/lib/i18n";
import { defaultLocale } from "@/types";

export const alt =
  "Sokongan Rohingya — verified ways to support Rohingya refugees in Malaysia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The site-wide social card, generated at build time. It carries the one claim
 * that matters for a link shared out of context: this platform does not take
 * donations. Next applies this file-convention image to every route.
 */
export default function OpengraphImage() {
  const dict = getDictionary(defaultLocale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // Satori supports the simple gradient syntax only — no size/position form.
          backgroundImage: "linear-gradient(135deg, #1b5754 0%, #141f27 55%)",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#1b5754",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
            }}
          >
            ♥
          </div>
          <div style={{ color: "#7fc4bf", fontSize: 28, letterSpacing: 2 }}>
            {dict.meta.siteName.toUpperCase()}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "white",
            fontSize: 60,
            lineHeight: 1.1,
            letterSpacing: -1.5,
          }}
        >
          Verified ways to support Rohingya refugees in Malaysia
        </div>

        <div style={{ display: "flex", color: "#c2ced5", fontSize: 26 }}>
          Independent · Donations go directly to the organisations, never through this site
        </div>
      </div>
    ),
    size,
  );
}
