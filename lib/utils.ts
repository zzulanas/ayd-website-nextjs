export function sortAllProjects(allProjects, parseTag){
    allProjects.forEach(project => {
        project.sort = project.contentfulMetadata.tags.find(tag => tag.id.includes(parseTag)) ?? 100
        if (project.sort !== 100){
            project.sort = project.sort.id.replace(parseTag, "")
            project.sort = parseInt(project.sort)
        } 
      })
      allProjects = allProjects.sort((a, b) => a.sort - b.sort)
}