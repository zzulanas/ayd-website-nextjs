import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPostsForHome, getAllProjectsByTag, getAllProjectsWithSlug, getFooterData } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import { sortAllProjects } from '../lib/utils'

export default function Residential({ preview, allProjects, footer }) {

  const title = "Cultural Projects"

  return (
    <>
      <Layout preview={preview} footer={footer}>
        <Head>
          <title>{title} | AyD</title>
          <meta property="og:title" content={title} />
          <meta property="og:description" content={project.description} />
          <meta property="og:url" content={`${process.env.NEXT_PUBLIC_VERCEL_URL}/projects/${project.slug}`} />
          <meta property="og:image" content={`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/og?title=${title}&category=${project.category}`} />
          <meta property="og:image" content={project.projectImagesCollection.items[0].url} />
        </Head>
        <Container>
          {allProjects.length > 0 && <MoreStories projects={allProjects} pageName={"Cultural Projects"} />}
          {allProjects.length == 0 && <h2 className='text-2xl'>No projects could be found</h2>}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allProjects = (await getAllProjectsByTag("categoryCultural")) ?? []
  sortAllProjects(allProjects, "culturalSort")
  const footer = await getFooterData()
  return {
    props: { preview, allProjects, footer },
    revalidate: 30,
  }
}
