import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'

import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { Newsletter } from '@/components/Newsletter'
import { formatDate } from '@/lib/formatDate'
import { Pre } from '@/components/Pre'
import { ArrowLeftIcon } from '@/components/Icon'

export function PostLayout({
  children,
  meta,
  isRssFeed = false,
  previousPathname,
}) {
  let router = useRouter()

  if (isRssFeed) {
    return children
  }

  return (
    <>
      <Head>
        <title>{`${meta.title} - Baptiste Chaleil`}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <Container className="mt-16 lg:mt-32">
        <div className="xl:relative">
          <div className="mx-auto max-w-2xl">
            {previousPathname && (
              <button
                type="button"
                onClick={() => router.back()}
                aria-label="Go back to posts"
                className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0"
              >
                <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
              </button>
            )}
            <article>
              <header className="flex flex-col">
                <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                  {meta.title}
                </h1>
                <ul className="mt-4 flex text-zinc-400 dark:text-zinc-500 gap-2">
                  {meta.tags.map(tag => (
                    <li key={tag}>
                      <Link href={`/tags/${tag}`}>
                        {`#${tag}`}
                      </Link>
                    </li>
                  ))}
                </ul>
                <time
                  dateTime={meta.date}
                  className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                >
                  <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                  <span className="ml-3">{formatDate(meta.date)}</span>
                </time>
                {meta.cover && <Image priority={true} className="my-4 rounded-3xl" src={meta.cover} alt={`cover for article ${meta.title}`} />}
              </header>
                <MDXProvider components={{pre: Pre }}>
                  <Prose className="mt-8">{children}</Prose>
                </MDXProvider>
            </article>
          </div>
        </div>
      </Container>
      <Container className="mt-12">
        <div className="mx-auto max-w-xl">
          <Newsletter />
        </div>
      </Container>
    </>
  )
}
