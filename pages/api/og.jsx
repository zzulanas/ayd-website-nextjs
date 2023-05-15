import { ImageResponse } from '@vercel/og';

export const config = {
    runtime: 'experimental-edge',
};

export default function handler(request) {
    try {
        const { searchParams } = new URL(request.url);

        const title = searchParams.has('title')
            ? searchParams.get('title')?.slice(0, 100)
            : 'Arquitectura y Diseño';

        const category = searchParams.has('category')
            ? searchParams.get('category')?.slice(0, 100)
            : '';

        const imageUrl = searchParams.has('imageUrl')
            ? searchParams.get('imageUrl')?.slice(0, 100)
            : "https://images.ctfassets.net/1dot4nwylomy/1c28w3Ck9Uy9mHzlWc8gkT/32ca18d06b7f16219e597bd56243dbd5/Site_Plan-01_WEB.jpg?w=640&q=100";

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundImage: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
                        fontSize: 32,
                        fontWeight: 600,
                        fontFamily: 'sans-serif',
                        padding: 80
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <span
                            style={{
                                fontSize: "90px",
                            }}>
                            AyD
                        </span>
                        <div style={{ marginLeft: 20, display: "flex", flexDirection: "column" }}>
                            <div style={{ marginTop: 50, fontSize: "45px" }}>{title}</div>
                            <div style={{ marginTop: 5, color: "gray" }}>{category}</div>
                        </div>
                    </div>
                    {imageUrl &&
                        <div style={{ width: '500px', height: '500px', borderRadius: '50%', overflow: 'hidden', display: "flex" }}>
                            <img src={imageUrl} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    }
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (e) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
