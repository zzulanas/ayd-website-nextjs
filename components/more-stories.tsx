import PostPreview from "./post-preview";

export default function MoreStories({ pageName, projects }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-6xl tracking-tighter leading-tight">
        {pageName}
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {projects.map((project) => (
          <PostPreview
            key={project.slug}
            title={project.title}
            coverImage={project.bannerImage}
            date={project.dateCreated}
            slug={project.slug}
            excerpt={project.projectTagLine}
            location={project.projectLocation}
          />
        ))}
      </div>
    </section>
  );
}
