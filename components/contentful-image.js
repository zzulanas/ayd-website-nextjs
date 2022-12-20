import Image from 'next/image'
import { React, useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const contentfulLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 100}`
}

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ContentfulImage = (props) => {
  const [open, setOpen] = useState(false);
  let slides = null
  if(props.slides !== undefined){
    slides = props.slides.map(slide => ({ src: slide.url})) 
  } else {
    slides = [{src: props.src}]
  }
  return (
          <>
          <Image 
          loader={contentfulLoader} 
          className={props.lightboxEnabled ? "cursor-pointer" : ""}
          {...props}
          onClick={() => setOpen(true)} />
          
          {props.lightboxEnabled && <Lightbox
            open={open}
            index={props.index}
            close={() => setOpen(false)}
            slides={slides} /> }

          </>)
}

export default ContentfulImage