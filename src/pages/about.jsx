import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { GitHubIcon, LinkedInIcon, TwitterIcon } from '@/components/SocialIcons'
import { MailIcon } from '@/components/Icons'

import portraitImage from '@/images/portrait.jpg'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-gold-500 dark:text-zinc-200 dark:hover:text-gold-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-gold-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

export default function About() {
  return (
    <>
      <Head>
        <title>About - Baptiste Chaleil</title>
        <meta
          name="description"
          content="I’m Baptiste Chaleil. I work and live in Paris."
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt="picture of me at work on my desk"
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              I’m Baptiste Chaleil. I work and live in Paris.
            </h1>
            <div className="prose mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                I enjoy exploring the world through travel or tinkering with my{' '}
                <a href="https://github.com/mrdotb/dotfiles">~dotfiles</a> to
                enhance my workflow.
              </p>
              <p>
                I have extensive experience with the{' '}
                <a href="https://www.phoenixframework.org/">
                  Phoenix Framework
                </a>{' '}
                and <a href="http://absinthe-graphql.org/">Absinthe</a> the
                GraphQL toolkit for Elixir. My professional background includes
                working as the main backend developer for a cashier SaaS app at{' '}
                <a href="https://www.evoluflor.fr/">evoluflor</a> and being
                responsible for infrastructure and various projects at{' '}
                <a href="https://pandascore.co">PandaScore</a>, where I
                collaborated closely with the CTO.
              </p>
              <p>
                In terms of project management, I employ Agile methodologies and
                use tools like Asana and Notion for organizing tasks and writing
                specifications.
              </p>
              <p>
                In addition to my Elixir expertise, I am well-versed in
                JavaScript, Node.js, and the React framework. I stay up-to-date
                with industry trends and news by frequenting Hacker News
                regularly.
              </p>
              <p>
                As a part of the Elixir community, I regularly attend{' '}
                <a href="https://www.meetup.com/fr-FR/elixir/">Paris.ex</a>{' '}
                meetups and have even been featured on an{' '}
                <a href="https://topenddevs.com/podcasts/elixir-mix/episodes/creating-league-of-legends-probuild-with-baptiste-chaleil-emx-207">
                  elixir podcast
                </a>{' '}
                discussing an elixir tutorial series I wrote.
              </p>
              <p>
                You can find my open-source projects on GitHub, and I
                occasionally answer questions on the Elixir Slack.
              </p>
              <p>
                For my development environment, I use{' '}
                <a href="https://i3wm.org/">i3</a> or{' '}
                <a href="https://pop.system76.com/">Pop!_OS</a>, while docker is
                my go-to choice for server deployments.
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink href="https://twitter.com/mrdotB" icon={TwitterIcon}>
                Follow on Twitter
              </SocialLink>
              <SocialLink
                href="https://github.com/mrdotb"
                icon={GitHubIcon}
                className="mt-4"
              >
                Follow on GitHub
              </SocialLink>
              <SocialLink
                className="mt-4"
                href="https://www.linkedin.com/in/baptiste-chaleil-9494a775/"
                icon={LinkedInIcon}
              >
                Follow on LinkedIn
              </SocialLink>
              <SocialLink
                href="mailto:hello@mrdotb.com"
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                hello@mrdotb.com
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
