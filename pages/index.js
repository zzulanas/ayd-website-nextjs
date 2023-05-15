import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPicturesForGallery, getAllPostsForHome, getAllProjectsWithSlug, getFooterData } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Gallery from '../components/gallery'

export default function Index({ preview, pictures, footer }) {

  const title = "AyD Arquitectura y Diseño"

  return (
    <>
      <Layout preview={preview} footer={footer}>
        <Head>
          <title>{title}</title>
          <meta
            property="og:image"
            content={`${BASE_URL}/api/og?title=${title}`}
          />
        </Head>
        <Container>
          <Intro />
          <Gallery pictures={pictures} />
          {/* {heroProject && (
            <HeroPost
              title={heroProject.title}
              coverImage={heroProject.projectImagesCollection.items[0]}
              date={heroProject.dateCreated}
              slug={heroProject.slug}
              excerpt={heroProject.tagLine}
            />
          )}
          {moreProjects.length > 0 && <MoreStories projects={moreProjects} pageName={"Other"}/>} */}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const pictures = await getAllPicturesForGallery()
  const footer = await getFooterData()
  pictures.sort((picA, picB) => {
    if (parseInt(picA.homesort) < parseInt(picB.homesort)) {
      return -1
    }
    if (parseInt(picA.homesort) > parseInt(picB.homesort)) {
      return 1
    }
    return 0;
  })
  return {
    props: { preview, pictures, footer },
    revalidate: 30,
  }
}
