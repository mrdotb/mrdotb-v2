import glob from 'fast-glob'
import * as path from 'path'

async function importPost(postFilename) {
  let { meta, default: component } = await import(
    `../pages/posts/${postFilename}`
  )
  return {
    slug: postFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
    component,
  }
}

async function getPosts() {
  let postFilenames = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/posts'),
  })

  const posts = await Promise.all(postFilenames.map(importPost))
  return posts
}

export async function getAllPosts() {
  let posts = await getPosts()

  return posts.sort((a, z) => new Date(z.date) - new Date(a.date))
}

export async function getUniqueTags() {
  const posts = await getPosts()

  const tags = posts.map(post => post.tags).flat().sort()
  const uniqueTags = [...new Set(tags)]
  return uniqueTags
}

export async function getPostsByTag(tag) {
  let posts = await getPosts()
  return posts.filter(post => post.tags.includes(tag))
}
