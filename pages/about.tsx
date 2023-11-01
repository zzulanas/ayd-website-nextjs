import Container from "../components/container";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import markdownStyles from "../components/markdown-styles.module.css";
import Layout from "../components/layout";
import {
  getAboutDescription,
  getAllTeamMembers,
  getFooterData,
} from "../lib/api";
import Avatar from "../components/avatar";
import SectionSeparator from "../components/section-separator";
import RichTextAsset from "../components/rich-text-asset";

const customMarkdownOptions = (content) => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <RichTextAsset
        id={node.data.target.sys.id}
        assets={content.links.assets.block}
      />
    ),
  },
});

export default function About({ preview, teamMembers, description, footer }) {
  const title = "About Arq y Di";

  const pageMeta = {
    title: "About Arq y Di",
    description:
      "Arq Y Di | Arqitectura Y Diseño is a full-service architecture and design firm based in Los Angeles, CA. We are a team of architects, designers, and artists who are passionate about creating spaces that are both functional and beautiful.",
    url: `https://${process.env.VERCEL_URL}/about`,
    imageUrl: `https://${process.env.VERCEL_URL}/api/og?title=${title}`,
  };

  return (
    <>
      <Layout preview={preview} footer={footer} pageMeta={pageMeta}>
        <Container>
          <div className="grid grid-cols-1">
            <div>
              <h2 className="mb-8 text-6xl md:text-7xl font-light tracking-tighter leading-tight">
                About AyD
              </h2>
            </div>
            <div className={markdownStyles["markdown"]}>
              {documentToReactComponents(
                description.json,
                customMarkdownOptions(description.json)
              )}
            </div>
          </div>
          <SectionSeparator></SectionSeparator>
          <h2 className="font-light text-6xl text-center py-10">
            Meet the team
          </h2>
          <div className='grid lg:grid-cols-2 md:grid-cols-1"'>
            {teamMembers.map((member) => {
              return (
                <div className="m-10">
                  <Avatar
                    picture={member.memberPicture}
                    name={member.memberName}
                    role={member.memberRole}
                    key={member.memberName}
                  />
                </div>
              );
            })}
          </div>
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const teamMembers = (await getAllTeamMembers()) ?? [];
  const description = (await getAboutDescription()) ?? [];
  let footer = await getFooterData();
  if (!footer || !footer.footer) {
    footer = { ...footer, footer: null }; // Setting the inner footer to null if it's undefined
  }
  return {
    props: { preview, teamMembers, description, footer },
    revalidate: 30,
  };
}
