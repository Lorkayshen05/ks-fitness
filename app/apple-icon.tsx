import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** iOS home-screen icon; `app/icon.svg` covers every other surface. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1b5754",
          color: "#7fc4bf",
          fontSize: 110,
        }}
      >
        ♥
      </div>
    ),
    size,
  );
}
