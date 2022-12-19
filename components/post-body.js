import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import Container from './container'
import ContentfulImage from './contentful-image'
import markdownStyles from './markdown-styles.module.css'
import RichTextAsset from './rich-text-asset'

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

export default function PostBody({ content, images }) {
  const section1 = {content: content.json.content.slice(0,2), data: {}, nodeType: 'document'}
  const section2 = {content: content.json.content.slice(2,4), data: {}, nodeType: 'document'}
  const section3 = {content: content.json.content.slice(4), data: {}, nodeType: 'document'}
  return (
    <Container className="max-w-2xl">
    <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-10'>
      <div className={markdownStyles['markdown']}>
          {documentToReactComponents(
            section1,
            customMarkdownOptions(content)
          )}
          {images.length > 2 && (<div>
          <ContentfulImage
                      width={800}
                      height={700}
                      alt={images[2].description}
                      lightboxEnabled={true}
                      src={images[2].url}
                      key={images[2].url}
                    />
                    <h2>{images[2].description}</h2>
                    </div>)}
          {documentToReactComponents(
            section3,
            customMarkdownOptions(content)
          )}
          {images.length > 3 && <ContentfulImage
                      width={800}
                      height={700}
                      alt={images[3].description}
                      lightboxEnabled={true}
                      src={images[3].url}
                      key={images[3].url}
                    /> }
        </div>
        <div className={markdownStyles['markdown']}>
        {images.length > 0 && <ContentfulImage
                      width={800}
                      height={700}
                      alt={images[0].description}
                      lightboxEnabled={true}
                      src={images[0].url}
                      key={images[0].url}
                    />}
          {documentToReactComponents(
            section2,
            customMarkdownOptions(content)
          )}
          {images.length > 1 && <ContentfulImage
                      width={800}
                      height={700}
                      alt={images[1].description}
                      lightboxEnabled={true}
                      src={images[1].url}
                      key={images[1].url}
                    />}
        </div>
    </div>
    </Container>
  )
}
