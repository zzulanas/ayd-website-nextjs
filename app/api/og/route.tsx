import { ImageResponse } from "next/og";

// Only render images hosted on Contentful's CDN — never fetch arbitrary URLs.
function safeImageUrl(raw: string | null) {
  if (!raw) return null;
  try {
    const url = new URL(raw.startsWith("//") ? `https:${raw}` : raw);
    if (url.protocol !== "https:" || url.hostname !== "images.ctfassets.net") return null;
    url.search = "?w=1000&h=1260&fit=fill&fm=jpg&q=80";
    return url.toString();
  } catch {
    return null;
  }
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.slice(0, 100) || "Arquitectura y Diseño";
  const category = searchParams.get("category")?.slice(0, 40) || "Architecture & Design — Los Angeles";
  const image = safeImageUrl(searchParams.get("imageUrl"));

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#f7f6f2", color: "#141413" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: 72 }}>
          <div style={{ fontSize: 44, fontWeight: 600, letterSpacing: "-0.04em" }}>AyD</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 22, textTransform: "uppercase", letterSpacing: "0.14em", color: "#6f6e69" }}>{category}</div>
            <div style={{ marginTop: 20, fontSize: title.length > 30 ? 64 : 84, lineHeight: 1, letterSpacing: "-0.035em" }}>{title}</div>
          </div>
        </div>
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" width={500} height={630} style={{ width: 500, height: 630, objectFit: "cover" }} />
        )}
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
