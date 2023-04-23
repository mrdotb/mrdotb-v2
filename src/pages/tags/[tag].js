import Head from 'next/head'
import { useRouter } from 'next/router'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { getDataByTag, getUniqueTags } from '@/lib/data'

function Data({ data }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`${data.type === 'til' ? '/tils/' : '/posts/'}${data.slug}`}>
          {data.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={data.date}
          className="md:hidden"
          decorate
        >
          {formatDate(data.date)}
        </Card.Eyebrow>
        <Card.Description>{data.description}</Card.Description>
        <Card.Cta>Read {data.type}</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={data.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(data.date)}
      </Card.Eyebrow>
    </article>
  )
}

export default function Tag({datas}) {
  const router = useRouter()
  const tag = router.query.tag

  return (
    <>
      <Head>
        <title>{`Posts & Tils tagged ${tag} - Baptiste Chaleil`}</title>
        <meta
          name="description"
          content={`My notes and posts about various topics on software development tagged ${tag}`}
        />
      </Head>
      <SimpleLayout title={`#${tag}`}>
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {datas.map((data) => (
              <Data key={data.slug} data={data} />
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
  const data = await getDataByTag(context.params.tag)
  return {
    props: {
      datas: data.map(({ component, ...meta }) => meta),
    },
  }
}
