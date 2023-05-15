import { ImageResponse } from '@vercel/og';

export const config = {
    runtime: 'experimental-edge',
};

export default function handler(request) {
    try {
        const { searchParams } = new URL(request.url);

        // /projects/
        const isProject = searchParams.has('projects');
        const title = isProject
            ? searchParams.get('projects')?.slice(0, 100)
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
                        background: "rgb(255,255,255)",
                        background: "linear-gradient(98deg, rgba(255,255,255,1) 0%, rgba(226,224,224,1) 65%, rgba(101,101,101,1) 95%)",
                        fontSize: 32,
                        fontWeight: 600,
                        padding: 40
                    }}
                >
                    <div
                        width="256"
                        height="256"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'black',
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
                    <div style={{ marginTop: 50 }}>Casa De Carmen 2.0</div>
                    <div style={{ marginTop: 5, color: "gray" }}>Residential</div>
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