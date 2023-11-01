import Head from "next/head";
import { CMS_NAME, HOME_OG_IMAGE_URL, OG_DESCRIPTION } from "../lib/constants";

interface MetaProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  url?: string;
}

export default function Meta({ title, description, imageUrl, url }: MetaProps) {
  return (
    <Head>
      <title>{`${title} | Arq Y Di` || "AyD"}</title>
      <meta
        name="description"
        content={
          description || "Arq Y Di is a Los Angeles based Architecture Firm"
        }
      />
      <meta charSet="UTF-8" />
      <meta name="robots" content="index,follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${title} | Arq Y Di` || "Arq Y Di"} />
      <meta property="og:description" content={description || OG_DESCRIPTION} />
      <meta
        property="og:url"
        content={url || `https://${process.env.VERCEL_URL}`}
      />
      <meta
        property="og:image"
        content={imageUrl || `https://${process.env.VERCEL_URL}/api/og`}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
    </Head>
  );
}
