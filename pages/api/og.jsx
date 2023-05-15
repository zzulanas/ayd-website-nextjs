import { ImageResponse } from '@vercel/og';

export const config = {
    runtime: 'edge',
};

export default function handler(request) {
    try {
        const { searchParams } = new URL(request.url);

        // ?title=Hello%20World&category=Example
        const hasTitle = searchParams.has('title');
        const title = hasTitle
            ? searchParams.get('title')?.slice(0, 100)
            : 'Arquitectura y Diseño';

        // ?category=Example
        const hasCategory = searchParams.has('category');
        const category = hasCategory
            ? searchParams.get('category')?.slice(0, 100)
            : '';

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        backgroundImage: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
                        fontSize: 32,
                        fontWeight: 600,
                        padding: 80
                    }}
                >
                    <div
                        width="256"
                        height="256"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: 'black',
                            borderRadius: '90%',
                            padding: '40px',
                            color: 'white',
                        }}
                    >
                        <span
                            style={{
                                fontSize: "90px",
                            }}>
                            AyD
                        </span>
                    </div>
                    <div style={{ marginLeft: 20, display: "flex", flexDirection: "column" }}>
                        <div style={{ marginTop: 50, fontSize: "45px" }}>{title}</div>
                        <div style={{ marginTop: 5, color: "gray" }}>{category}</div>
                    </div>
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