import ContentfulImage from './contentful-image'
import Link from 'next/link'
import cn from 'classnames'

export default function CoverImage({ title, url, slug }) {
  const image = (
    <ContentfulImage
      width={2000}
      height={1400}
      objectFit="cover"
      alt={`Cover Image for ${title}`}
      className={cn('shadow-small', {
        'hover:shadow-medium transition-shadow duration-200': slug,
      })}
      src={url}
    />
  )

  return (
    <div  className={cn('shadow-small', {
      'hover:shadow-medium transition-shadow duration-600': slug,
    })}>
      {slug ? (
        <Link href={`/projects/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}
