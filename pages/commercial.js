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
  return (
    <>
      <Layout preview={preview} footer={footer}>
        <Head>
          <title>Commercial Projects</title>
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
