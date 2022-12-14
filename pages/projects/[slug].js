import { useRouter } from 'next/router'
import Head from 'next/head'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import MoreStories from '../../components/more-stories'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import SectionSeparator from '../../components/section-separator'
import Layout from '../../components/layout'
import { getAllProjectsWithSlug, getFooterData, getProjectAndMoreProjects } from '../../lib/api'
import PostTitle from '../../components/post-title'
import { CMS_NAME } from '../../lib/constants'
import ContentfulImage from '../../components/contentful-image'
import DateComponent from '../../components/date'

export default function Post({ project, moreProjects, preview, fiveXThousandImage, footer }) {
  const router = useRouter()

  if(router.isFallback){
    return <h1>Loading…</h1>
  }

  if (!router.isFallback && !project && !footer) {
    return <ErrorPage statusCode={404} />
  }

  const images = project.projectImagesCollection.items.filter(image => {
    const hasTag = image.contentfulMetadata.tags.some(tag => tag.id === "homepageImage")
    return !hasTag
  })
  return (
    <Layout preview={preview} footer={footer}>
      <Container className="">
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {project.title} | AyD
                </title>
                <meta property="og:image" content={project.projectImagesCollection.items[0].url} />
              </Head>
              {/* <PostHeader
                title={project.title}
                coverImage={project.projectImagesCollection.items[0]}
                date={project.dateCreated}
              /> */}


              <PostBody content={project.content} images={images} project={project} fiveXThousandImage={fiveXThousandImage}/>
            </article>

            <SectionSeparator />
            {moreProjects && moreProjects.length > 0 && (
              <MoreStories projects={moreProjects} pageName={"More Projects"}/>
            )}
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getProjectAndMoreProjects(params.slug)
  const footer = await getFooterData()
  let fiveXThousandImage = data.project.projectImagesCollection.items[0]
  data.project.projectImagesCollection.items.forEach((image, idx) => {
  if (image.contentfulMetadata.tags.some(tag => tag.id === 'size500x1000')){
    fiveXThousandImage = image
    data.project.projectImagesCollection.items.splice(idx, 1)
  }
})
  return {
    props: {
      preview,
      project: data?.project ?? null,
      moreProjects: data?.moreProjects ?? null,
      fiveXThousandImage: fiveXThousandImage ?? null,
      footer: footer ?? null,
    },
    revalidate: 30,
  }
}

export async function getStaticPaths() {
  const allProjects = await getAllProjectsWithSlug()
  return {
    paths: allProjects?.map(({ slug }) => `/projects/${slug}`) ?? [],
    fallback: true,
  }
}
