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
  return posts.map((post) => ({ type: 'post', ...post }))
}

async function importTil(tilFilename) {
  let { meta, default: component } = await import(
    `../pages/tils/${tilFilename}`
  )
  return {
    slug: tilFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
    component,
  }
}

async function getTils() {
  let tilFilenames = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/tils'),
  })

  const tils = await Promise.all(tilFilenames.map(importTil))
  return tils.map((til) => ({ type: 'til', ...til }))
}

export async function getAllPosts() {
  let posts = await getPosts()

  return posts.sort((a, z) => new Date(z.date) - new Date(a.date))
}

export async function getAllTils() {
  let tils = await getTils()

  return tils.sort((a, z) => new Date(z.date) - new Date(a.date))
}

export async function getData() {
  let posts = await getPosts()
  let tils = await getTils()

  return posts.concat(tils).sort((a, z) => new Date(z.date) - new Date(a.date))
}

export async function getUniqueTags() {
  const posts = await getPosts()
  const tils = await getTils()

  const tags = tils
    .concat(posts)
    .map((post) => post.tags)
    .flat()
    .sort()
  const uniqueTags = [...new Set(tags)]
  return uniqueTags
}

export async function getDataByTag(tag) {
  let data = await getData()

  return data.filter((til) => til.tags.includes(tag))
}
