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
import { getAllPostsWithSlug, getAllProjectsWithSlug, getPostAndMorePosts, getProjectAndMoreProjects } from '../../lib/api'
import PostTitle from '../../components/post-title'
import { CMS_NAME } from '../../lib/constants'
import ContentfulImage from '../../components/contentful-image'

export default function Post({ project, moreProjects, preview }) {
  const router = useRouter()

  if (!router.isFallback && !project) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <Container className="">
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {project.title} | Next.js Blog Example with {CMS_NAME}
                </title>
                <meta property="og:image" content={project.projectImagesCollection.items[0].url} />
              </Head>
              <PostHeader
                title={project.title}
                coverImage={project.projectImagesCollection.items[0]}
                date={project.dateCreated}
              />
              <PostBody content={project.content} />
            </article>
            {project.projectImagesCollection.items.slice(1).map(
              item => (
                <ContentfulImage
                  width={4000}
                  height={1000}
                  alt={`Cover Image for ${project.title}`}
                  className='shadow-small'
                  src={item.url}
                  key={item.url}
                />
              )
            )}
            <SectionSeparator />
            {/* {moreProjects && moreProjects.length > 0 && (
              <MoreStories projects={moreProjects} />
            )} */}
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getProjectAndMoreProjects(params.slug)
  return {
    props: {
      preview,
      project: data?.project ?? null,
      moreProjects: data?.moreProjects ?? null,
    },
  }
}

export async function getStaticPaths() {
  const allProjects = await getAllProjectsWithSlug()
  return {
    paths: allProjects?.map(({ slug }) => `/projects/${slug}`) ?? [],
    fallback: true,
  }
}
