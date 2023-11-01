import Container from "../components/container";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllPicturesForGallery, getFooterData } from "../lib/api";
import Gallery from "../components/gallery";

export default function Index({ preview, pictures, footer }) {
  const title = "Arq Y Di";
  const pageMeta = {
    title: title,
    description:
      "Arq Y Di is an architecture and design firm based in Los Angeles, California.",
    url: `https://${process.env.VERCEL_URL}`,
    imageUrl: `https://${process.env.VERCEL_URL}/api/og`,
  };

  return (
    <>
      <Layout preview={preview} footer={footer} pageMeta={pageMeta}>
        <Container>
          <Intro />
          <Gallery pictures={pictures} />
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const pictures = await getAllPicturesForGallery();
  let footer = await getFooterData();
  if (!footer || !footer.footer) {
    footer = { ...footer, footer: null }; // Setting the inner footer to null if it's undefined
  }
  pictures.sort((picA, picB) => {
    if (parseInt(picA.homesort) < parseInt(picB.homesort)) {
      return -1;
    }
    if (parseInt(picA.homesort) > parseInt(picB.homesort)) {
      return 1;
    }
    return 0;
  });
  return {
    props: { preview, pictures, footer },
    revalidate: 30,
  };
}
