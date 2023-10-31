import Container from '../components/container'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import markdownStyles from "../components/markdown-styles.module.css"
import Layout from '../components/layout'
import { getAboutDescription, getAllTeamMembers, getFooterData } from '../lib/api'
import Head from 'next/head'
import { OG_DESCRIPTION } from '../lib/constants'
import Avatar from '../components/avatar'
import SectionSeparator from '../components/section-separator'

const customMarkdownOptions = (content) => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <RichTextAsset
        id={node.data.target.sys.id}
        assets={content.links.assets.block}
      />
    ),
  },
})

export default function About({ preview, teamMembers, description, footer }) {

  const title = "About Arq y Di"
  const meta_description = "Arqitectura Y Diseño is a full-service architecture and design firm based in Los Angeles, CA. We are a team of architects, designers, and artists who are passionate about creating spaces that are both functional and beautiful."

  return (
    <>
      <Layout preview={preview} footer={footer}>
        <Head>
          <title>{title} | AyD</title>
          <meta name="robots" content="all" />
          <meta name="title" content={title} />
          <meta name="description" content={meta_description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={OG_DESCRIPTION} />
          <meta property="og:url" content={`https://${process.env.VERCEL_URL}/about`} />
          <meta property="og:image" content={`https://${process.env.VERCEL_URL}/api/og?title=${title}`} />
        </Head>
        <Container>
          <div className="grid grid-cols-1">
            <div>
              <h2 className="mb-8 text-6xl md:text-7xl font-light tracking-tighter leading-tight">
                About AyD
              </h2>
            </div>
            <div className={markdownStyles['markdown']}>
              {documentToReactComponents(
                description.json,
                customMarkdownOptions(description.json)
              )}
            </div>

          </div>
          <SectionSeparator></SectionSeparator>
          <h2 className='font-light text-6xl text-center py-10'>Meet the team</h2>
          <div className='grid lg:grid-cols-2 md:grid-cols-1"'>
            {teamMembers.map((member) => {
              return <Avatar
                picture={member.memberPicture}
                name={member.memberName}
                role={member.memberRole}
                key={member.memberName}
                className="m-10"
              />
            })}
          </div>

        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const teamMembers = (await getAllTeamMembers()) ?? []
  const description = (await getAboutDescription()) ?? []
  const footer = await getFooterData() ?? null
  return {
    props: { preview, teamMembers, description, footer },
    revalidate: 30,
  }
}
