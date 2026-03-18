import Link from 'next/link';

interface HomeHeroProps {
  postCount?: number;
}

export function HomeHero({ postCount }: HomeHeroProps) {
  return (
    <section className="mb-16 border-b border-zinc-200 pb-12 dark:border-zinc-700">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          Brian&apos;s Tech Corner
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">
          Deep dives on <strong>platform engineering</strong>, <strong>AI agents</strong>, and
          <strong> infrastructure</strong>. Real experience, no fluff.
        </p>
        <p className="mt-3 text-base text-zinc-500 dark:text-zinc-400">
          Sharing what I&apos;ve learned building{' '}
          <a
            href="https://www.herpops.com"
            className="underline hover:text-zinc-700 dark:hover:text-zinc-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            Herp Ops
          </a>
          , open source tools, and scaling systems.
        </p>

        {/* Social proof */}
        {postCount !== undefined && postCount > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400">
            <span>{postCount} posts published</span>
            <span className="hidden sm:inline">·</span>
            <a
              href="https://discord.gg/q2N7R2KDRs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-700 dark:hover:text-zinc-200"
            >
              Community on Discord →
            </a>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/start-here"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Start Here
          </Link>
          <Link
            href="/blog"
            className="rounded-lg border border-zinc-300 px-4 py-2 text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            Browse All Posts
          </Link>
          <Link
            href="#newsletter"
            className="rounded-lg border border-zinc-300 px-4 py-2 text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            Subscribe
          </Link>
        </div>
      </div>
    </section>
  );
}
