import Link from 'next/link'
import Avatar from '../components/avatar'
import DateComponent from '../components/date'
import CoverImage from './cover-image'

export default function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  location
}) {
  return (
    <Link href={`/projects/${slug}`} className="w-full h-full">
    <div>
      <div className="mb-4">
        <CoverImage title={title} slug={slug} url={coverImage.url} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        
          <a className="hover:underline w-full h-full cursor-pointer">{title}</a>

      </h3>
      {location != null &&
        <div className="text-lg text-slate-400">
          {location}
        </div>
      }
    </div>
    </Link>
  )
}
