import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { getAllTils } from '@/lib/data'

function Til({ til }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/tils/${til.slug}`}>
          {til.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={til.date}
          className="md:hidden"
          decorate
        >
          {formatDate(til.date)}
        </Card.Eyebrow>
        <Card.Description>{til.description}</Card.Description>
        <Card.Cta>Read til</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={til.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(til.date)}
      </Card.Eyebrow>
    </article>
  )
}

export default function TilsIndex({ tils }) {
  return (
    <>
      <Head>
        <title>Today I learned - Baptiste Chaleil</title>
        <meta
          name="description"
          content="Today I learned"
        />
      </Head>
      <SimpleLayout title="Today I learned">
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {tils.map((til) => (
              <Til key={til.slug} til={til} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      tils: (await getAllTils()).map(({ component, ...meta }) => meta),
    },
  }
}
