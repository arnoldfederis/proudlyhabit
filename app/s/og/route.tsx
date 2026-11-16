import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { parseMilestone, unitLine } from "@/lib/share";

export const runtime = "nodejs";

/**
 * Open Graph image for a shared milestone (1200×630). This is what X,
 * Threads, Messages, WhatsApp, LinkedIn and Facebook show when the share
 * link is posted.
 */
export async function GET(request: NextRequest) {
  const m = parseMilestone(Object.fromEntries(request.nextUrl.searchParams));

  const [icon, inter600, inter700] = await Promise.all([
    readFile(join(process.cwd(), "public", "proudly-icon-512x512.png")),
    readFile(join(process.cwd(), "public", "fonts", "inter-600.ttf")),
    readFile(join(process.cwd(), "public", "fonts", "inter-700.ttf")),
  ]);
  const iconSrc = `data:image/png;base64,${icon.toString("base64")}`;

  const dark = m.style !== "soft";
  const background =
    m.style === "glow"
      ? "linear-gradient(135deg, #7C5CF0 0%, #DE5CA6 100%)"
      : m.style === "night"
        ? "linear-gradient(180deg, #1A1730 0%, #2B2145 100%)"
        : "linear-gradient(135deg, #F7F2FF 0%, #FDEFF5 55%, #EEF6FF 100%)";
  const ink = dark ? "#FFFFFF" : "#241C2F";
  const muted = dark ? "rgba(255,255,255,0.78)" : "#6F6478";
  const accent = m.style === "glow" ? "#FFFFFF" : m.color;

  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        display: "flex",
        background,
        fontFamily: "Inter",
        padding: 72,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -140,
          left: -100,
          width: 460,
          height: 460,
          borderRadius: 999,
          background: accent,
          opacity: 0.18,
          filter: "blur(60px)",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 999,
              background: accent,
            }}
          />
          <div style={{ fontSize: 40, fontWeight: 700, color: ink }}>
            {m.habit}
          </div>
        </div>
        {m.name ? (
          <div style={{ fontSize: 28, color: muted, marginTop: 8 }}>
            {`${m.name}'s small wins`}
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 24,
            marginTop: 36,
          }}
        >
          <div
            style={{
              fontSize: 190,
              fontWeight: 700,
              color: ink,
              lineHeight: 1,
              letterSpacing: -6,
            }}
          >
            {String(m.value)}
          </div>
          <div style={{ fontSize: 52, fontWeight: 700, color: ink }}>
            {unitLine(m)}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          gap: 14,
        }}
      >
        {/* biome-ignore lint/performance/noImgElement: ImageResponse renders plain img */}
        <img alt="" height={120} src={iconSrc} style={{ borderRadius: 28 }} width={120} />
        <div style={{ fontSize: 36, fontWeight: 700, color: ink }}>Proudly</div>
        <div style={{ fontSize: 24, color: muted }}>Free on the App Store</div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: inter600, weight: 600, style: "normal" },
        { name: "Inter", data: inter700, weight: 700, style: "normal" },
      ],
      headers: { "Cache-Control": "public, max-age=86400, immutable" },
    },
  );
}
