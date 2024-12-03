import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypePrismPlus from 'rehype-prism-plus'
import remarkToc from "remark-toc"
import rehypeSlug from "rehype-slug"
import rehypeMetaAttribute from './src/lib/rehypeMetaAttribute.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx'],
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true
  },
  async redirects() {
    return [
      {
        source: '/qr',
        destination: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        permanent: false
      }
    ]
  }
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, [remarkToc, {maxDepth: 3}]],
    rehypePlugins: [rehypePrismPlus, rehypeSlug, rehypeMetaAttribute],
    providerImportSource: '@mdx-js/react'
  },
})

export default withMDX(nextConfig)
