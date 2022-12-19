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
import { getAllProjectsWithSlug, getProjectAndMoreProjects } from '../../lib/api'
import PostTitle from '../../components/post-title'
import { CMS_NAME } from '../../lib/constants'
import ContentfulImage from '../../components/contentful-image'
import DateComponent from '../../components/date'

export default function Post({ project, moreProjects, preview, fiveXThousandImage }) {
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
                  {project.title} | AyD
                </title>
                <meta property="og:image" content={project.projectImagesCollection.items[0].url} />
              </Head>
              {/* <PostHeader
                title={project.title}
                coverImage={project.projectImagesCollection.items[0]}
                date={project.dateCreated}
              /> */}

              <div className="grid sm:grid-cols-1 md:grid-cols-2  gap-2 mx-auto px-5 container mb-20 gap-x-10">
                <div>
                  <ContentfulImage
                  width={500}
                  height={1000}
                  alt={`Cover Image for ${project.title}`}
                  objectFit="cover"
                  lightboxEnabled={true}
                  src={fiveXThousandImage.url}
                  key={fiveXThousandImage.url}
                />
                <h2 className='text-gray-400'>{fiveXThousandImage.description}</h2>
                </div>
                <div className='grid grid-cols-1 gap-y-20'>

                  <div className='place-self-end'>
                    <ContentfulImage
                      width={800}
                      height={800}
                      alt={`Cover Image for ${project.title}`}
                      lightboxEnabled={true}
                      src={project.bannerImage.url}
                      key={project.bannerImage.url}
                    />
                    <h2 className='text-gray-400'>{project.bannerImage.description}</h2>
                  </div>
    
                  <div className='place-self-left text-right'>
                    <PostTitle >{project.title}</PostTitle>
                    <div className='flex flex-row justify-between'>
                      <h2 className='text-2xl font-light text-gray-400 text-left'>{project.projectLocation}</h2>
                      <h2 className='text-2xl font-light text-gray-400'><DateComponent dateString={project.dateCreated}/></h2>
                    </div>
                    <br/>
                    <h2 className='text-lg text-left font-light'>{project.projectTagline}</h2>
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
