import Image from 'next/image'
import { useState } from 'react';

const contentfulLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 100}`
}

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const ContentfulImage = (props) => {
  const [isLoading, setLoading] = useState(true);
  return <Image 
          loader={contentfulLoader} 
          {...props} />
}

export default ContentfulImage