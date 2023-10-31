import ErrorPage from 'next/error'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Container from '../../components/container'
import Layout from '../../components/layout'
import MoreStories from '../../components/more-stories'
import PostBody from '../../components/post-body'
import PostTitle from '../../components/post-title'
import SectionSeparator from '../../components/section-separator'
import { getAllProjectsWithSlug, getFooterData, getProjectAndMoreProjects } from '../../lib/api'
import { OG_DESCRIPTION } from '../../lib/constants'

export default function Post({ project, moreProjects, preview, fiveXThousandImage, footer, title, category, slug, bannerImageUrl }) {
  const router = useRouter()

  if (router.isFallback) {
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
                <title>{title} | Arq y Di</title>
                <meta name="robots" content="all" />
                <meta name="title" content={title} />
                <meta name="description" content={project.content.json.content.slice(0, 2)} />
                <meta name="keywords" content="Architecture, Design, Los Angeles, Projects, Arq Y Di" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={OG_DESCRIPTION} />
                <meta property="og:url" content={`https://${process.env.VERCEL_URL}/projects/${slug}`} />
                <meta property="og:image" content={`https://${process.env.VERCEL_URL}/api/og?title=${title}&category=${category}&imageUrl=${bannerImageUrl}`} />
              </Head>
              {/* <PostHeader
                title={project.title}
                coverImage={project.projectImagesCollection.items[0]}
                date={project.dateCreated}
              /> */}


              <PostBody content={project.content} images={images} project={project} fiveXThousandImage={fiveXThousandImage} />
            </article>

            <SectionSeparator />
            {moreProjects && moreProjects.length > 0 && (
              <MoreStories projects={moreProjects} pageName={"More Projects"} />
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
  const category = () => {
    data.project.contentfulMetadata.tags.forEach(tag => {
      switch (tag.id) {
        case "categoryResidential":
          return "Residential"
        case "categoryCommercial":
          return "Commercial"
        case "categoryCultural":
          return "Cultural"
        default:
          return "Project"
      }
    }
    )
  }
  let fiveXThousandImage = data.project.projectImagesCollection.items[0]
  data.project.projectImagesCollection.items.forEach((image, idx) => {
    if (image.contentfulMetadata.tags.some(tag => tag.id === 'size500x1000')) {
      fiveXThousandImage = image
      data.project.projectImagesCollection.items.splice(idx, 1)
    }
  })
  return {
    props: {
      preview,
      project: data?.project ?? null,
      title: data?.project?.title ?? null,
      category: category() ?? null,
      slug: data?.project?.slug ?? null,
      bannerImageUrl: data?.project?.bannerImage?.url ?? null,
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
