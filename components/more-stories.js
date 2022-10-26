import PostPreview from '../components/post-preview'

export default function MoreStories({ pageName, projects }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        {pageName} projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {projects.map((project) => (
          <PostPreview
            key={project.slug}
            title={project.title}
            coverImage={project.projectImagesCollection.items[0]}
            date={project.dateCreated}
            slug={project.slug}
            excerpt={project.projectTagLine}
          />
        ))}
      </div>
    </section>
  )
}
