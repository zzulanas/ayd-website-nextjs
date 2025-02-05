import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

// TODO: implement random backgrounds https://prismic.io/blog/vercel-og-image-randomized#randomizing-our-og-image-background

export default function handler(request) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.has("title")
      ? searchParams.get("title")?.slice(0, 100)
      : "Arquitectura y Diseño";

    let category = searchParams.has("category")
      ? searchParams.get("category")?.slice(0, 100)
      : "";

    if (category == null) {
      category = "Arquitectura y Diseño";
    }

    const imageUrl = searchParams.has("imageUrl")
      ? searchParams.get("imageUrl")?.slice(0, 300)
      : null;

    if (imageUrl != null) {
      console.log(request.url);
      console.log(imageUrl);
      console.log(decodeURIComponent(imageUrl));
    }

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundImage: "linear-gradient(to top, #dfe9f3 0%, white 100%)",
            fontSize: 32,
            fontWeight: 600,
            fontFamily: "sans-serif",
            padding: 80,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "90px",
              }}
            >
              Arq y Di
            </span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ marginTop: 50, fontSize: "45px" }}>{title}</div>
              <div style={{ marginTop: 5, color: "gray" }}>{category}</div>
            </div>
          </div>
          {imageUrl && (
            <div
              style={{
                width: "500px",
                height: "500px",
                borderRadius: "50%",
                overflow: "hidden",
                display: "flex",
              }}
            >
              <img
                src={decodeURIComponent(imageUrl)}
                alt={title}
                style={{ width: "160%", height: "100%", objectFit: "cover" }}
              />
            </div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
