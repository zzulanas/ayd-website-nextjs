import Container from "../components/container";
import MoreStories from "../components/more-stories";
import Layout from "../components/layout";
import { getAllProjectsByTag, getFooterData } from "../lib/api";
import { sortAllProjects } from "../lib/utils";

export default function Residential({ preview, allProjects, footer }) {
  const title = "Previous Work";
  const pageMeta = {
    title: title,
    description:
      "Arq Y Di Previous Projects | Arq Y Di is an architecture and design firm based in Los Angeles, California.",
    url: `https://${process.env.VERCEL_URL}/previous-work`,
    imageUrl: `https://${process.env.VERCEL_URL}/api/og?title=${title}`,
  };
  // const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout preview={preview} footer={footer} pageMeta={pageMeta}>
        <Container>
          {allProjects.length > 0 && (
            <MoreStories projects={allProjects} pageName={"Previous Work"} />
          )}
          {allProjects.length == 0 && (
            <h2 className="text-2xl">No projects could be found</h2>
          )}
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const allProjects = (await getAllProjectsByTag("categoryPreviousWork")) ?? [];
  sortAllProjects(allProjects, "previousWorkSort");
  const footer = (await getFooterData()) ?? null;
  return {
    props: { preview, allProjects, footer },
    revalidate: 30,
  };
}
