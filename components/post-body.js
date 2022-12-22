import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import Container from './container'
import ContentfulImage from './contentful-image'
import { React, useState } from 'react';
import markdownStyles from './markdown-styles.module.css'
import RichTextAsset from './rich-text-asset'
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import PostTitle from './post-title';
import DateComponent from './date';
import SectionSeparator from './section-separator';

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

function splitArray(arr) {
  // Initialize two empty arrays to hold even and odd index elements
  let evenIndexElements = [];
  let oddIndexElements = [];

  // Loop through the input array
  for (let i = 0; i < arr.length; i++) {
    // If the current index is even, add the element to the evenIndexElements array
    if (i % 2 === 0) {
      evenIndexElements.push(arr[i]);
    }
    // If the current index is odd, add the element to the oddIndexElements array
    else {
      oddIndexElements.push(arr[i]);
    }
  }

  // Return the two arrays as a tuple
  return [evenIndexElements, oddIndexElements];
}

export default function PostBody({ content, images, project, fiveXThousandImage }) {
  let imagesWithIntro = ([fiveXThousandImage, project.bannerImage]).concat(images)
  let slides = imagesWithIntro.map(slide => ({ src: slide.url})) 

  const [index, setIndex] = useState(-1);

  const section1 = {content: content.json.content.slice(0,2), data: {}, nodeType: 'document'}
  const section2 = {content: content.json.content.slice(2,4), data: {}, nodeType: 'document'}
  const section3 = {content: content.json.content.slice(4), data: {}, nodeType: 'document'}

  const BODY_IMAGE_WIDTH = 800
  const BODY_IMAGE_HEIGHT = 800
  
  
  let bottomImages = []
  if(images.length > 4){
    let temp = images.slice(4)
    bottomImages = temp.map((image, idx) => {
      return <ContentfulImage
                      width={BODY_IMAGE_WIDTH}
                      height={BODY_IMAGE_HEIGHT}
                      alt={image.description}
                      lightboxEnabled={true}
                      src={image.url}
                      key={image.url}
                      onClick={() => setIndex(idx + 2)}
                    />
    })
  }

  const splitImages = splitArray(bottomImages)
  
  return (
    <Container className="max-w-2xl">
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
          onClick={() => setIndex(0)}
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
              onClick={() => setIndex(1)}
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
    <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-10'>
      <div className={markdownStyles['markdown']}>
          {documentToReactComponents(
            section1,
            customMarkdownOptions(content)
          )}
          {images.length > 0 && <div>
          <ContentfulImage
                      width={800}
                      height={700}
                      alt={images[0].description}
                      lightboxEnabled={true}
                      index={0}
                      src={images[0].url}
                      key={images[0].url}
                      onClick={() => setIndex(2)}
                    /> 
                    <h2 className='text-gray-400'>{images[0].description}</h2>
            </div>}
          {documentToReactComponents(
            section3,
            customMarkdownOptions(content)
          )}
          {images.length > 2 && (<div>
          <ContentfulImage
                      width={800}
                      height={700}
                      alt={images[2].description}
                      lightboxEnabled={true}
                      slides={images}
                      index={2}
                      src={images[2].url}
                      key={images[2].url}
                      onClick={() => setIndex(4)}
                    />
                    <h2 className='text-gray-400'>{images[2].description}</h2>
                    </div>)}
          {images.length >= 5 &&  splitImages[1]}
        </div>
        <div className={markdownStyles['markdown']}>
        {images.length > 3 && <div>
        <ContentfulImage
                      width={800}
                      height={700}
                      alt={images[3].description}
                      lightboxEnabled={true}
                      index={3}
                      src={images[3].url}
                      key={images[3].url}
                      onClick={() => setIndex(5)}
                    />
                    <h2 className='text-gray-400'>{images[3].description}</h2>
                    </div>}
          {documentToReactComponents(
            section2,
            customMarkdownOptions(content)
          )}
          {images.length > 1 && <div><ContentfulImage
                      width={800}
                      height={700}
                      alt={images[1].description}
                      lightboxEnabled={true}
                      index={1}
                      src={images[1].url}
                      key={images[1].url}
                      onClick={() => setIndex(3)}
                    />
                    <h2 className='text-gray-400'>{images[1].description}</h2>
                    </div>}
          {images.length >= 4 &&  splitImages[0]}
        <Lightbox
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            slides={slides} />
        </div>
    </div>
    <div>

    </div>
    
    </Container>
  )
}
