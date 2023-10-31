import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPostsForHome, getAllProjectsByTag, getAllProjectsWithSlug, getFooterData } from '../lib/api'
import Head from 'next/head'
import { OG_DESCRIPTION } from '../lib/constants'
import { sortAllProjects } from '../lib/utils'

export default function Residential({ preview, allProjects, footer }) {
  const title = "Commercial Projects"
  const meta_description = "Arq Y Di Commercial Projects"
  return (
    <>
      <Layout preview={preview} footer={footer}>
        <Head>
          <title>{title} | AyD</title>
          <meta name="robots" content="all" />
          <meta name="title" content={title} />
          <meta name="description" content={meta_description} />
          <meta name="keywords" content="Architecture, Design, Commercial, Projects, Arq Y Di" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={OG_DESCRIPTION} />
          <meta property="og:url" content={`https://${process.env.VERCEL_URL}/commercial`} />
          <meta property="og:image" content={`https://${process.env.VERCEL_URL}/api/og?title=${title}`} />
        </Head>
        <Container>
          {allProjects.length > 0 && <MoreStories projects={allProjects} pageName={"Commercial Projects"} />}
          {allProjects.length == 0 && <h2 className='text-2xl'>No projects could be found</h2>}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allProjects = (await getAllProjectsByTag("categoryCommercial")) ?? []
  sortAllProjects(allProjects, "commercialSort")
  const footer = await getFooterData()
  return {
    props: { preview, allProjects, footer },
    revalidate: 30,
  }
}
