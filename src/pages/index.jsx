import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/Button'
import { Card } from '@/components/Card'
import { Container } from '@/components/Container'
import { Newsletter } from '@/components/Newsletter'
import { GitHubIcon, LinkedInIcon, TwitterIcon } from '@/components/SocialIcons'
import { ArrowDownIcon, BriefcaseIcon } from '@/components/Icons'
import logoEvoluflor from '@/images/logos/evoluflor.svg'
import logoPablo from '@/images/logos/pablo.svg'
import logoPandascore from '@/images/logos/pandascore.png'
import logoScarfSage from '@/images/logos/scarfsage.svg'
import logoDeepido from '@/images/logos/deepido.jpeg'
import logoPareto from '@/images/logos/pareto.jpeg'
import { formatDate } from '@/lib/formatDate'
import { generateRssFeed } from '@/lib/generateRssFeed'
import { getData } from '@/lib/data'

function Data({ data }) {
  return (
    <Card as="article">
      <Card.Title
        href={`${data.type === 'til' ? '/tils/' : '/posts/'}${data.slug}`}
      >
        {data.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={data.date} decorate>
        {formatDate(data.date)}
      </Card.Eyebrow>
      <Card.Description>{data.description}</Card.Description>
      <Card.Cta>Read {data.type}</Card.Cta>
    </Card>
  )
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function Resume() {
  let resume = [
    {
      company: 'Pareto Holding',
      title: 'Elixir Developer',
      logo: logoPareto,
      alt: 'logo of pareto holding',
      start: '2024',
      end: '2024',
    },
    {
      company: 'Deepido',
      title: 'Elixir Developer',
      logo: logoDeepido,
      alt: 'logo of deepido company',
      start: '2024',
      end: '2024',
    },
    {
      company: 'Evoluflor',
      title: 'Lead Developer',
      logo: logoEvoluflor,
      alt: 'logo of evoluflor company',
      start: '2020',
      end: '2023',
    },
    {
      company: 'ScarfSage',
      title: 'Founder',
      logo: logoScarfSage,
      alt: 'logo of scarfsage company',
      start: '2022',
      end: 'Present',
    },
    {
      company: 'Pablo',
      title: 'Elixir developer',
      logo: logoPablo,
      alt: 'logo of pablo company',
      start: '2021',
      end: '2021',
    },
    {
      company: 'Pandascore',
      title: 'Ruby / Node.js / Elixir developer',
      logo: logoPandascore,
      alt: 'logo of pandascore company',
      start: '2017',
      end: '2019',
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={role.logo}
                alt={role.alt}
                className="h-7 w-7 rounded-full"
                unoptimized
              />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
              </dd>
              <dt className="sr-only">Role</dt>
              <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                {role.title}
              </dd>
              <dt className="sr-only">Date</dt>
              <dd
                className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                aria-label={`${role.start.label ?? role.start} until ${
                  role.end.label ?? role.end
                }`}
              >
                <time dateTime={role.start.dateTime ?? role.start}>
                  {role.start.label ?? role.start}
                </time>{' '}
                <span aria-hidden="true">—</span>{' '}
                <time dateTime={role.end.dateTime ?? role.end}>
                  {role.end.label ?? role.end}
                </time>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
      <Button
        href="https://www.linkedin.com/in/baptiste-chaleil-9494a775/"
        target="_blank"
        className="group mt-6 w-full"
      >
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-white" />
      </Button>
    </div>
  )
}

export default function Home({ datas }) {
  return (
    <>
      <Head>
        <title>Baptiste Chaleil - Freelance Elixir Developer</title>
        <meta
          name="description"
          content="Hi, I'm Baptiste - Elixir Developer. I am a developer specialized in development of web applications with Elixir. I love to develop. I care about UX, responsiveness, performance, maintainability and scalability."
        />
      </Head>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Freelance elixir developer from Paris 🗼
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            Hello, I am Baptiste, a tech professional with six years of diverse
            development experience. I led as a lead developer for a SaaS cashier
            system for three years, excelling both independently and in teams. I
            embrace adaptability and a hacker mindset, always eager to engineer
            innovative solutions.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://twitter.com/mrdotB"
              aria-label="Follow on Twitter"
              icon={TwitterIcon}
            />
            <SocialLink
              href="https://github.com/mrdotb"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://www.linkedin.com/in/baptiste-chaleil-9494a775/"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {datas.map((data) => (
              <Data key={data.slug} data={data} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume />
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed()
  }

  return {
    props: {
      datas: (await getData())
        .slice(0, 4)
        .map(({ component, ...meta }) => meta),
    },
  }
}
