import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPostsForHome, getAllProjectsByTag, getAllProjectsWithSlug, getFooterData } from '../lib/api'
import Head from 'next/head'
import { sortAllProjects } from '../lib/utils'
import { OG_DESCRIPTION } from '../lib/constants'

export default function Residential({ preview, allProjects, footer }) {
  const heroProject = allProjects[0]
  const title = "Previous Work"
  const description = "Arq Y Di Previous Work"
  // const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout preview={preview} footer={footer}>
        <Head>
          <title>{title} | AyD</title>
          <meta name="robots" content="all" />
          <meta name="title" content={title} />
          <meta name="description" content={description} />
          <meta name="keywords" content="Architecture, Design, Previous Work, Projects, Arq Y Di" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={OG_DESCRIPTION} />
          <meta property="og:url" content={`https://${process.env.VERCEL_URL}/previous-work`} />
          <meta property="og:image" content={`https://${process.env.VERCEL_URL}/api/og?title=${title}`} />
        </Head>
        <Container>
          {allProjects.length > 0 && <MoreStories projects={allProjects} pageName={"Previous Work"} />}
          {allProjects.length == 0 && <h2 className='text-2xl'>No projects could be found</h2>}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allProjects = (await getAllProjectsByTag("categoryPreviousWork")) ?? []
  sortAllProjects(allProjects, "previousWorkSort")
  const footer = await getFooterData() ?? null
  return {
    props: { preview, allProjects, footer },
    revalidate: 30,
  }
}
