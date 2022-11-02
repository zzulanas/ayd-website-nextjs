import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPostsForHome, getAllProjectsByTag, getAllProjectsWithSlug } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'

export default function Residential({ preview, allProjects }) {
  const heroProject = allProjects[0]
  console.log(allProjects)
  // const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Cultural Projects</title>
        </Head>
        <Container>
          {/* {heroProject && (
            <HeroPost
              title={heroProject.title}
              coverImage={heroProject.projectImagesCollection.items[0]}
              date={heroProject.dateCreated}
              slug={heroProject.slug}
              excerpt={heroProject.tagLine}
            />
          )} */}
          <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
            Cultural projects
          </h2>
          {allProjects.length > 0 && <MoreStories projects={allProjects} pageName={"Residential"} />}
          {allProjects.length == 0 && <h2 className='text-2xl'>No projects could be found</h2>}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allProjects = (await getAllProjectsByTag("categoryCultural")) ?? []
  return {
    props: { preview, allProjects },
  }
}
