import ContentfulImage from './contentful-image'

export default function Avatar({ name, picture, role }) {
  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-6/12 sm:w-4/12 my-5">
        <ContentfulImage
          src={picture.url}
          width={800}
          height={800}
          className="shadow rounded-full h-auto align-middle border-none"
          alt={name}
        />
        <div className="text-lg font-bold text-center">{name}</div>
        <div className="text-base text-center">{role}</div>
      </div>
      
    </div>
  )
}
