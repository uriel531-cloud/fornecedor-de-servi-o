import { ImageResponse } from "next/og";

export const alt = "LASTRO Engenharia Integrada — Do alicerce ao acabamento. Um só contrato.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Template de imagem Open Graph da marca (gerada no build). */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0d0d0c",
          color: "#f3f1ec",
          padding: 72,
          backgroundImage: "linear-gradient(rgba(243,241,236,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(243,241,236,0.06) 1px, transparent 1px)",
          backgroundSize: "100px 100px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 56, height: 56, border: "4px solid #f3f1ec", display: "flex", alignItems: "flex-end" }}>
            <div style={{ width: "100%", height: 16, background: "#ff4d00" }} />
          </div>
          <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: 4 }}>LASTRO</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1, textTransform: "uppercase", letterSpacing: -2 }}>Do alicerce ao acabamento.</div>
          <div style={{ fontSize: 84, fontStyle: "italic", lineHeight: 1.1, color: "#ff4d00", marginTop: 8 }}>Um só contrato.</div>
        </div>
        <div style={{ fontSize: 24, color: "#8b857a", letterSpacing: 3, textTransform: "uppercase" }}>Engenharia integrada — 40+ especialidades</div>
      </div>
    ),
    size,
  );
}
