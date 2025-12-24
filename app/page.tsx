import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import { formatDate } from '@/lib/formatDate';
import { JsonLd, getOrganizationSchema, getWebSiteSchema } from '@/lib/json-ld';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brianstechcorner.com';

export const metadata: Metadata = {
  alternates: {
    canonical: siteUrl,
  },
};

const TOPICS = [
  { label: 'Homelab', tag: 'homelab' },
  { label: 'Kubernetes', tag: 'kubernetes' },
  { label: 'GitOps', tag: 'gitops' },
  { label: 'Home Assistant', tag: 'home-assistant' },
  { label: 'Networking', tag: 'networking' },
  { label: 'Python', tag: 'python' },
];

export default async function HomePage() {
  const isDev = process.env.NODE_ENV === 'development';
  const posts = await getAllPosts(isDev);
  const featured = posts[0];
  const latest = posts.slice(0, 5);

  return (
    <>
      <JsonLd data={getOrganizationSchema()} />
      <JsonLd data={getWebSiteSchema()} />

      <main className="mx-auto max-w-5xl px-4 py-14">
        {/* Hero */}
        <section className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight dark:text-zinc-100">
            Brian&apos;s Tech Corner
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-zinc-700 dark:text-zinc-300">
            A collection of notes, experiments, and walkthroughs from building things at
            home — covering homelabs, automation, infrastructure, and backend projects.
          </p>

          {/* Topics */}
          <div className="mt-6 flex flex-wrap gap-2">
            {TOPICS.map((t) => (
              <Link
                key={t.tag}
                href={`/blog?tag=${encodeURIComponent(t.tag)}`}
                className="rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
              >
                {t.label}
              </Link>
            ))}
          </div>

          <div className="mt-6">
            <Link
              href="/blog"
              className="text-sm font-medium text-zinc-800 underline underline-offset-4 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-zinc-100"
            >
              View all posts →
            </Link>
          </div>
        </section>

        {/* Featured */}
        {featured && (
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-semibold dark:text-zinc-100">Featured</h2>

            <Link
              href={`/blog/${featured.slug}`}
              className="block overflow-hidden rounded-2xl border border-zinc-200 transition hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              {/* Featured image (optional) */}
              {featured.image && (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  {formatDate(featured.date)}
                </div>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight dark:text-zinc-100">
                  {featured.title}
                </h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-300">
                  {featured.description}
                </p>
                <div className="mt-4 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  Read the post →
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Latest */}
        <section>
          <h2 className="mb-4 text-xl font-semibold dark:text-zinc-100">Latest</h2>

          <div className="divide-y divide-zinc-100 rounded-2xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-700">
            {latest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block p-5 transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div className="font-medium text-zinc-900 dark:text-zinc-100">
                    {post.title}
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    {formatDate(post.date)}
                  </div>
                </div>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
