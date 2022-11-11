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
import DateComponent from '../../components/date'

export default function Post({ project, moreProjects, preview }) {
  const router = useRouter()

  const coverImage = project.projectImagesCollection.items[0]
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
                  {project.title} | AyD
                </title>
                <meta property="og:image" content={project.projectImagesCollection.items[0].url} />
              </Head>
              {/* <PostHeader
                title={project.title}
                coverImage={project.projectImagesCollection.items[0]}
                date={project.dateCreated}
              /> */}

              <div className="grid grid-cols-2 gap-2 mx-auto px-5 container mb-20">
                <div>
                  <ContentfulImage
                  width={500}
                  height={1000}
                  alt={`Cover Image for ${project.title}`}
                  className='shadow-small'
                  src={coverImage.url}
                  key={coverImage.url}
                />
                </div>
                <div className='grid grid-cols-1'>

                  <div className='place-self-end'>
                    <ContentfulImage
                      width={800}
                      height={700}
                      alt={`Cover Image for ${project.title}`}
                      
                      src={coverImage.url}
                      key={coverImage.url}
                    />
                  </div>
    
                  <div className='place-self-center text-right'>
                    <PostTitle >{project.title}</PostTitle>
                    <h2 className='text-1xl'><DateComponent dateString={project.dateCreated}/></h2>
                    <h2 className='text-2xl'>{project.projectLocation}</h2>
                    <h2 className='text-2xl'>{project.projectTagline}</h2>
                  </div>

                  <div>
                  </div>
                  
                </div>
              </div>
              <SectionSeparator />
              <PostBody content={project.content} images={project.projectImagesCollection.items}/>
            </article>

            <SectionSeparator />
            {moreProjects && moreProjects.length > 0 && (
              <MoreStories projects={moreProjects} />
            )}
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
