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
  return (
          <>
          <Image 
          loader={contentfulLoader} 
          className={props.lightboxEnabled ? "cursor-pointer" : ""}
          {...props}
          onClick={() => setOpen(true)} />
          
          {props.lightboxEnabled && <Lightbox
            open={open}
            close={() => setOpen(false)}
            slides={[
              { src: props.src },
            ]} /> }
          
          </>)
}

export default ContentfulImage