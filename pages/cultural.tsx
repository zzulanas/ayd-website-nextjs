import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import {
  getAllPostsForHome,
  getAllProjectsByTag,
  getAllProjectsWithSlug,
  getFooterData,
} from "../lib/api";
import Head from "next/head";
import { OG_DESCRIPTION } from "../lib/constants";
import { sortAllProjects } from "../lib/utils";

export default function Residential({ preview, allProjects, footer }) {
  const title = "Cultural Projects";
  const pageMeta = {
    title: title,
    description:
      "Arq Y Di Cultural Projects | Arq Y Di is an architecture and design firm based in Los Angeles, California.",
    url: `https://${process.env.VERCEL_URL}/commercial`,
    imageUrl: `https://${process.env.VERCEL_URL}/api/og?title=${title}`,
  };

  return (
    <>
      <Layout preview={preview} footer={footer} pageMeta={pageMeta}>
        <Container>
          {allProjects.length > 0 && (
            <MoreStories
              projects={allProjects}
              pageName={"Cultural Projects"}
            />
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
  const allProjects = (await getAllProjectsByTag("categoryCultural")) ?? [];
  sortAllProjects(allProjects, "culturalSort");
  let footer = await getFooterData();
  return {
    props: { preview, allProjects, footer },
    revalidate: 30,
  };
}
