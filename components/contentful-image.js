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
          {...props}  
          className={cn(
            'group-hover:opacity-75 duration-700 ease-in-out',
            isLoading
              ? 'grayscale blur-2xl scale-110'
              : 'grayscale-0 blur-0 scale-100',
              "w-full aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
          )}
  onLoadingComplete={() => setLoading(false)}/>
}

export default ContentfulImage