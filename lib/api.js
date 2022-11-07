const POST_GRAPHQL_FIELDS = `
slug
title
coverImage {
  url
}
date
author {
  name
  picture {
    url
  }
}
excerpt
content {
  json
  links {
    assets {
      block {
        sys {
          id
        }
        url
        description
      }
    }
  }
}
`

const PROJECT_GRAPHQL_FIELDS = `
title
projectTagline
content {
  json
}
projectLocation
slug
dateCreated
projectImagesCollection{
  items{
    url
  }
}
`

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json())
}

function extractPost(fetchResponse) {
  return fetchResponse?.data?.postCollection?.items?.[0]
}

function extractPostEntries(fetchResponse) {
  return fetchResponse?.data?.postCollection?.items
}

function extractProjectsData(fetchResponse) {
  return fetchResponse?.data?.projectCollection?.items
}

function extractProject(fetchResponse) {
  return fetchResponse?.data?.projectCollection?.items?.[0]
}

function extractPictures(fetchResponse){
  const returnArray = []
  const res = fetchResponse?.data?.projectCollection?.items
  res.forEach(item => {
    returnArray.push({url: item?.projectImagesCollection?.items[0]?.url, slug: item?.slug, title: item?.title})
  })
  console.log(returnArray)
  return returnArray
}

export async function getPreviewPostBySlug(slug) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  )
  return extractPost(entry)
}

export async function getAllProjectsByTag(tag){
  const projects = await fetchGraphQL(
    `query projectCollectionQuery {
      projectCollection(where: {contentfulMetadata: {tags_exists: true tags:{id_contains_some: ["${tag}"]}}}) {
        items {
          ${PROJECT_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  return extractProjectsData(projects)
}

export async function getAllProjectsWithSlug() {
  const projects = await fetchGraphQL(
    `query {
      projectCollection(where: { slug_exists: true }) {
        items {
          ${PROJECT_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  return extractProjectsData(projects)
}

export async function getProjectBySlug(slug) {
  const project = await fetchGraphQL(
    `query {
      projectCollection(where: { slug: "${slug}" }, limit: 1) {
        items {
          ${PROJECT_GRAPHQL_FIELDS}
        }
      }
    }`,
  )
  return extractProject(project)
}

export async function getAllPostsWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  return extractPostEntries(entries)
}

export async function getAllPostsForHome(preview) {
  const entries = await fetchGraphQL(
    `query {
      postCollection(order: date_DESC, preview: ${preview ? 'true' : 'false'}) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return extractPostEntries(entries)
}

export async function getAllPicturesForGallery() {
  const pictures = await fetchGraphQL(
    `query {
      projectCollection{
        items{
          title
          slug
          projectImagesCollection{
            items{
              url
            }
          } 
        }
      }
    }`
  )
  return extractPictures(pictures)
}

export async function getAllProjectsForHome() {
  const entries = await fetchGraphQL(
    `query {
      projectCollection(order: date_DESC) {
        items {
          ${PROJECT_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  return extractPostEntries(entries)
}

export async function getPostAndMorePosts(slug, preview) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: ${
      preview ? 'true' : 'false'
    }, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, preview: ${
      preview ? 'true' : 'false'
    }, limit: 2) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    preview
  )
  return {
    post: extractPost(entry),
    morePosts: extractPostEntries(entries),
  }
}

export async function getProjectAndMoreProjects(slug) {
  const entry = await fetchGraphQL(
    `query {
      projectCollection(where: { slug: "${slug}" },  limit: 1) {
        items {
          ${PROJECT_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  const entries = await fetchGraphQL(
    `query {
      projectCollection(where: { slug_not_in: "${slug}" }, order: date_DESC, limit: 2) {
        items {
          ${PROJECT_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  return {
    project: extractProject(entry),
    moreProjects: extractProjectsData(entries),
  }
}
