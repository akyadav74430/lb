import { ImageResponse } from "next/og";

export const alt = "Lovebite — escorts, call girls and companions in India";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Site-wide social card.
 *
 * Replaces the previously referenced `/og-image.png`, which did not exist and
 * therefore produced a broken image on every shared link.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#14161a",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 14, height: 56, background: "#c41e3a" }} />
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: 1 }}>
            Lovebite
          </div>
        </div>

        <div
          style={{
            marginTop: 44,
            fontSize: 66,
            fontWeight: 800,
            lineHeight: 1.12,
            maxWidth: 940,
          }}
        >
          Escorts, call girls &amp; companions in India
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 28,
            color: "#b9c0c9",
            maxWidth: 900,
          }}
        >
          City-wise listings · Public profiles · Direct contact
        </div>
      </div>
    ),
    { ...size }
  );
}