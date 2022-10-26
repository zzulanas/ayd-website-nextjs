import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPostsForHome, getAllProjectsWithSlug } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'

export default function Index({ preview, allProjects }) {
  const heroProject = allProjects[0]
  const moreProjects = allProjects.slice(1)
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>AyD: Arquitectura y Diseño</title>
        </Head>
        <Container>
          <Intro />
          {heroProject && (
            <HeroPost
              title={heroProject.title}
              coverImage={heroProject.projectImagesCollection.items[0]}
              date={heroProject.dateCreated}
              slug={heroProject.slug}
              excerpt={heroProject.tagLine}
            />
          )}
          {moreProjects.length > 0 && <MoreStories projects={moreProjects} pageName={"Other"}/>}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allProjects = (await getAllProjectsWithSlug()) ?? []
  return {
    props: { preview, allProjects },
  }
}
