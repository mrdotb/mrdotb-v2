import Head from 'next/head'
import { useRouter } from 'next/router'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { getPostsByTag, getUniqueTags } from '@/lib/posts'

function Post({ post }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/posts/${post.slug}`}>
          {post.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={post.date}
          className="md:hidden"
          decorate
        >
          {formatDate(post.date)}
        </Card.Eyebrow>
        <Card.Description>{post.description}</Card.Description>
        <Card.Cta>Read post</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={post.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(post.date)}
      </Card.Eyebrow>
    </article>
  )
}

export default function Tag({posts}) {
  const router = useRouter()
  const tag = router.query.tag
  return (
    <>
      <Head>
        <title>{`Posts tagged ${tag} - Baptiste Chaleil`}</title>
        <meta
          name="description"
          content={`My notes and posts about various topics on software development tagged ${tag}`}
        />
      </Head>
      <SimpleLayout title={`#${tag}`}>
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {posts.map((post) => (
              <Post key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticPaths() {
  const uniqueTags = await getUniqueTags()
  const paths = uniqueTags.map(tag => ({
    params: {tag: tag}
  }))
  return {
    paths: paths,
    fallback: false
  }
}

export async function getStaticProps(context) {
  const posts = await getPostsByTag(context.params.tag)
  return {
    props: {
      posts: posts.map(({ component, ...meta }) => meta),
    },
  }
}
