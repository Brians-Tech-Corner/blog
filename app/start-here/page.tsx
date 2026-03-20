import Link from 'next/link';
import type { Metadata } from 'next';
import { discordUrl } from '@/lib/social-links';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brianstechcorner.com';

const ogImage = `${siteUrl}/api/og?${new URLSearchParams({
  title: 'Start Here',
  description: 'New to Brian\'s Tech Corner? Here\'s where to start based on what you want to learn.',
}).toString()}`;

export const metadata: Metadata = {
  title: 'Start Here',
  description:
    "New to Brian's Tech Corner? Here's the best starting point based on what you want to learn — homelabs, platform engineering, or building in public.",
  alternates: {
    canonical: `${siteUrl}/start-here`,
  },
  openGraph: {
    title: "Start Here | Brian's Tech Corner",
    description:
      "New to Brian's Tech Corner? Here's where to start based on what you want to learn.",
    url: `${siteUrl}/start-here`,
    siteName: "Brian's Tech Corner",
    type: 'website',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Start Here | Brian's Tech Corner",
    description:
      "New to Brian's Tech Corner? Here's where to start based on what you want to learn.",
    images: [ogImage],
  },
};

interface ReadingPath {
  title: string;
  description: string;
  audience: string;
  posts: { title: string; slug: string; description: string }[];
  color: string;
}

const paths: ReadingPath[] = [
  {
    title: 'Build a Kubernetes Homelab',
    audience: 'For engineers who want to run production-like infrastructure at home',
    description:
      'A full series taking you from hardware selection to a complete Kubernetes cluster with GitOps, observability, and HTTPS. Every post is a real config from my own setup.',
    color: 'blue',
    posts: [
      {
        title: 'Planning Your Kubernetes Homelab Hardware',
        slug: 'kubernetes-homelab-planning-hardware',
        description: 'How to choose Mini PCs, networking gear, and storage for a power-efficient homelab.',
      },
      {
        title: 'Proxmox VM Templates for Kubernetes',
        slug: 'kubernetes-homelab-proxmox-vm-template',
        description: 'Create reusable cloud-init VM templates as the foundation for your cluster nodes.',
      },
      {
        title: 'Persistent Storage with Longhorn',
        slug: 'kubernetes-homelab-persistent-storage-longhorn',
        description: 'Add replicated persistent volumes to your homelab cluster with Longhorn.',
      },
      {
        title: 'GitOps with ArgoCD',
        slug: 'kubernetes-homelab-gitops-argocd',
        description: 'Manage your entire cluster declaratively from a git repo.',
      },
      {
        title: 'Homelab Monitoring with Grafana & Prometheus',
        slug: 'homelab-observability-monitoring-grafana-prometheus',
        description: 'Full observability stack — metrics, dashboards, and alerting.',
      },
    ],
  },
  {
    title: 'Platform Engineering',
    audience: 'For engineers building internal developer platforms or improving engineering velocity',
    description:
      'Practical platform engineering — from self-service scaffolding to AI-powered code review. Content drawn from my experience as a Staff Platform Engineer.',
    color: 'purple',
    posts: [
      {
        title: 'Platform Engineering for Solo Builders',
        slug: 'platform-engineering-for-solo-builders',
        description: 'Apply enterprise-grade platform patterns to indie projects without the overhead.',
      },
      {
        title: 'The Greybeard Platform Engineering Pack',
        slug: 'greybeard-platform-engineering-pack-intro',
        description: 'A thinking framework for making architecture decisions like a Staff engineer.',
      },
    ],
  },
  {
    title: 'Home Networking & Infrastructure',
    audience: 'For homelab builders who want a solid network foundation',
    description:
      'Network setup, DNS management, and the routing/firewall configuration that keeps my homelab running reliably.',
    color: 'green',
    posts: [
      {
        title: 'Why I Switched to UniFi (And Whether You Should)',
        slug: 'why-i-switched-to-unifi',
        description: 'An honest look at UniFi — the good, the trade-offs, and who it\'s for.',
      },
      {
        title: 'Pi-hole for Homelab DNS and Wildcard Records',
        slug: 'pihole-dns-homelab-wildcards',
        description: 'Block ads network-wide and use Pi-hole as your homelab\'s internal DNS resolver.',
      },
    ],
  },
];

const colorMap: Record<string, { border: string; bg: string; badge: string; badgeText: string; link: string }> = {
  blue: {
    border: 'border-blue-200 dark:border-blue-900/40',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    badge: 'bg-blue-100 dark:bg-blue-900/40',
    badgeText: 'text-blue-700 dark:text-blue-300',
    link: 'text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-200',
  },
  purple: {
    border: 'border-purple-200 dark:border-purple-900/40',
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    badge: 'bg-purple-100 dark:bg-purple-900/40',
    badgeText: 'text-purple-700 dark:text-purple-300',
    link: 'text-purple-700 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-200',
  },
  green: {
    border: 'border-green-200 dark:border-green-900/40',
    bg: 'bg-green-50 dark:bg-green-950/30',
    badge: 'bg-green-100 dark:bg-green-900/40',
    badgeText: 'text-green-700 dark:text-green-300',
    link: 'text-green-700 hover:text-green-900 dark:text-green-400 dark:hover:text-green-200',
  },
};

export default function StartHerePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight dark:text-zinc-100">Start Here</h1>

      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">
        New here? This page cuts through the archive and points you to the best starting
        point based on what you want to learn.
      </p>

      {/* About section */}
      <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-800/50">
        <h2 className="font-semibold dark:text-zinc-100">What is Brian&apos;s Tech Corner?</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          I&apos;m Brian &mdash; a Staff Platform Engineer by day, homelab builder and open source
          developer by night. This site is my public notebook: deep technical dives on the
          tools and decisions I actually use at work and at home. No fluff, no beginner
          hand-holding &mdash; just real configs, real trade-offs, and real experience.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/about"
            className="text-sm font-medium text-zinc-700 underline underline-offset-4 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
          >
            Read the full about page
          </Link>
          <a
            href={discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-zinc-700 underline underline-offset-4 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
          >
            Join the Discord community
          </a>
        </div>
      </div>

      {/* Reading paths */}
      <div className="mt-12 space-y-12">
        {paths.map((path) => {
          const colors = colorMap[path.color];
          return (
            <section key={path.title}>
              <div className={`rounded-2xl border p-6 ${colors.border} ${colors.bg}`}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h2 className="text-xl font-semibold dark:text-zinc-100">{path.title}</h2>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.badge} ${colors.badgeText}`}>
                    Reading Path
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {path.audience}
                </p>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300">{path.description}</p>
              </div>

              <div className="mt-4 divide-y divide-zinc-100 rounded-2xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-700">
                {path.posts.map((post, i) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block p-5 transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">
                        {i + 1}
                      </span>
                      <div>
                        <div className={`font-medium ${colors.link}`}>{post.title}</div>
                        <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                          {post.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* All posts CTA */}
      <div className="mt-16 text-center">
        <p className="text-zinc-600 dark:text-zinc-400">
          Ready to explore everything?
        </p>
        <Link
          href="/blog"
          className="mt-3 inline-block rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Browse all posts →
        </Link>
      </div>
    </main>
  );
}
