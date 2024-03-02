import ReactDOMServer from 'react-dom/server'
import { Feed } from 'feed'
import { mkdir, writeFile } from 'fs/promises'
import { withRouter } from 'next/router'

import { getData } from './data'

export async function generateRssFeed() {
  let datas = await getData()
  let siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  let author = {
    name: 'Baptiste Chaleil',
    email: 'hello@mrdotb.com',
  }

  let feed = new Feed({
    title: author.name,
    description:
      'I share my knowledge about the world of elixir and other topics. From succinct post to extensive series, organized chronologically.',
    author,
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/rss/feed.xml`,
      json: `${siteUrl}/rss/feed.json`,
    },
  })

  for (let data of datas) {
    let url
    if (data.type === 'til') {
      url = `${siteUrl}/tils/${data.slug}`
    } else {
      url = `${siteUrl}/posts/${data.slug}`
    }
    let html = ReactDOMServer.renderToStaticMarkup(
      withRouter(<data.component isRssFeed />)
    )

    feed.addItem({
      title: data.title,
      id: url,
      link: url,
      description: data.description,
      content: html,
      author: [author],
      contributor: [author],
      date: new Date(data.date),
    })
  }

  await mkdir('./public/rss', { recursive: true })
  await Promise.all([
    writeFile('./public/rss/feed.xml', feed.rss2(), 'utf8'),
    writeFile('./public/rss/feed.json', feed.json1(), 'utf8'),
  ])
}
