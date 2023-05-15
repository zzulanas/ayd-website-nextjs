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
  const title = "Residential Projects"
  return (
    <>
      <Layout preview={preview} footer={footer}>
        <Head>
          <title>{title} | AyD </title>
          <meta property="og:title" content={title} />
          <meta property="og:description" content={OG_DESCRIPTION} />
          <meta property="og:url" content={`${process.env.VERCEL_URL}/residential`} />
          <meta property="og:image" content={`${process.env.VERCEL_URL}/api/og?title=${title}`} />
        </Head>
        <Container>
          {allProjects.length > 0 && <MoreStories projects={allProjects} pageName={"Residential Projects"} />}
          {allProjects.length == 0 && <h2 className='text-2xl'>No projects could be found</h2>}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allProjects = (await getAllProjectsByTag("categoryResidential")) ?? []
  sortAllProjects(allProjects, "residentialSort")
  const footer = await getFooterData() ?? null
  return {
    props: { preview, allProjects, footer },
    revalidate: 30,
  }
}
