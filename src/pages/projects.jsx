import Head from 'next/head'
import Image from 'next/image'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import logoProbuildEx from '@/images/logos/probuild.png'
import logoLeagueOfReplays from '@/images/logos/league-of-replays.svg'
import logoScarfSage from '@/images/logos/scarfsage.svg'
import parchment from '@/images/logos/parchment.svg'
import liveReact from '@/images/logos/live-react.svg'
import dotb from '@/images/logos/dotb-logo.svg'

const projects = [
  {
    name: 'Dotb',
    description:
      '💸 A chrome extension for Vinted to boost your sales and save time.',
    link: { href: 'https://dotb.io?ref=mrdotb.com', label: 'dotb.io' },
    logo: dotb,
    alt: 'Dotb Logo',
  },
  {
    name: 'live_react',
    description:
      '✨ React inside Phoenix LiveView with seamless end-to-end reactivity',
    link: { href: 'https://github.com/mrdotb/live_react', label: 'Live React' },
    logo: liveReact,
    alt: 'Live React Logo',
  },
  {
    name: 'DiscoLog',
    description:
      '📜 Use Discord as a logging service and error tracking solution for elixir applications.',
    link: { href: 'https://github.com/mrdotb/disco-log', label: 'DiscoLog' },
    logo: parchment,
    alt: 'DiscoLog Logo',
  },
  {
    name: 'League of replays',
    description:
      '👁️ Record and replay league of legends game using the spectator api.',
    link: {
      href: 'https://leagueofreplays.co?ref=mrdotb.com',
      label: 'leagueofreplays.co',
    },
    logo: logoLeagueOfReplays,
    alt: 'Logo of League of Replays',
  },
  {
    name: 'ScarfSage',
    description:
      '🧣 Scarf Sage is an extensive Hermès scarf database featuring 1500+ designs, 3500+ variations.',
    link: {
      href: 'https://scarfsage.com?ref=mrdotb.com',
      label: 'scarfsage.com',
    },
    logo: logoScarfSage,
    alt: 'Logo of ScarfSage',
  },
  {
    name: 'League of Replays channel',
    description:
      '🎬 An automated League of Legends YouTube channel, created using Elixir and FFmpeg. ',
    link: {
      href: 'https://www.youtube.com/@league0freplays',
      label: 'youtube.com/@league0freplays',
    },
    logo: logoLeagueOfReplays,
    alt: 'Logo of League of Replays',
  },
  {
    name: 'ProbuildEx',
    description:
      '📑 A league of legend probuilds. Final result for my Elixir and Phoenix tutorial series.',
    link: {
      href: 'https://probuild.mrdotb.com?ref=mrdotb.com',
      label: 'probuild.mrdotb.com',
    },
    logo: logoProbuildEx,
    alt: 'Logo of ProbuildEx',
  },
]

function LinkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Projects() {
  return (
    <>
      <Head>
        <title>Baptiste Chaleil - Personal Projects</title>
        <meta
          name="description"
          content="Showcase of my favorite personal projects."
        />
      </Head>
      <SimpleLayout
        title="Things I’ve made trying to put my dent in the universe."
        intro="I’ve worked on many personal projects over the years but these are the ones that I’m most proud of. I take pleasure in working with open source, gaming and vintage sectors."
      >
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <Card as="li" key={project.name}>
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                {project.logo && (
                  <Image
                    src={project.logo}
                    alt={project.alt}
                    className="h-8 w-8 rounded-full"
                    unoptimized
                  />
                )}
                {project.svg && (
                  <project.svg className="h-8 w-8 rounded-full" />
                )}
              </div>
              <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                <Card.Link href={project.link.href}>{project.name}</Card.Link>
              </h2>
              <Card.Description>{project.description}</Card.Description>
              <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
                <LinkIcon className="h-6 w-6 flex-none" />
                <span className="ml-2">{project.link.label}</span>
              </p>
            </Card>
          ))}
        </ul>
      </SimpleLayout>
    </>
  )
}
