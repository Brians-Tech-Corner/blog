import Link from 'next/link';
import type { Metadata } from 'next';
import { discordUrl } from '@/lib/social-links';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brianstechcorner.com';
const beehiivUrl = process.env.NEXT_PUBLIC_BEEHIIV_URL;

const ogImage = `${siteUrl}/api/og?${new URLSearchParams({
  title: 'Start Here',
  description: "New to Brian's Tech Corner? Here's where to start based on what you want to learn.",
}).toString()}`;

export const metadata: Metadata = {
  title: 'Start Here',
  description:
    "New to Brian's Tech Corner? Here's the best starting point based on what you want to learn: homelabs, platform engineering, AI tooling, or building in public.",
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
        slug: '2026-01-03-kubernetes-homelab-part-1-planning-hardware',
        description: 'How to choose Mini PCs, networking gear, and storage for a power-efficient homelab.',
      },
      {
        title: 'Proxmox VM Templates for Kubernetes',
        slug: '2026-01-04-kubernetes-homelab-part-3-proxmox-vm-template',
        description: 'Create reusable cloud-init VM templates as the foundation for your cluster nodes.',
      },
      {
        title: 'Persistent Storage with Longhorn',
        slug: '2026-01-04-kubernetes-homelab-part-6-pv-longhorn',
        description: 'Add replicated persistent volumes to your homelab cluster with Longhorn.',
      },
      {
        title: 'GitOps with ArgoCD',
        slug: '2026-01-08-kubernetes-homelab-part-11-argocd',
        description: 'Manage your entire cluster declaratively from a git repo.',
      },
      {
        title: 'Homelab Monitoring with Grafana & Prometheus',
        slug: '2026-01-18-monitoring-homelab-with-grafana',
        description: 'Full observability stack: metrics, dashboards, and alerting.',
      },
    ],
  },
  {
    title: 'AI Tooling for Your Homelab',
    audience: 'For engineers who want AI assistants that actually know their infrastructure',
    description:
      'Practical AI integrations for homelab and platform engineers. Not chatbots — tools that connect Claude and other models directly to your infrastructure so they can actually help.',
    color: 'amber',
    posts: [
      {
        title: 'Build Your First MCP Server: Give Claude Access to Your Homelab',
        slug: '2026-03-21-build-mcp-server-homelab',
        description: 'Build a Python MCP server that lets Claude query your Kubernetes cluster, Docker containers, and homelab tools.',
      },
      {
        title: 'How to Think Like a Platform Engineer: The Greybeard Pack',
        slug: '2026-03-15-greybeard-platform-engineering-pack',
        description: 'An AI-powered thinking tool that catches bad architecture decisions before they cost you six months.',
      },
    ],
  },
  {
    title: 'Platform Engineering',
    audience: 'For engineers building internal developer platforms or improving engineering velocity',
    description:
      'Practical platform engineering: from self-service scaffolding to AI-powered code review. Content from my work as a Staff Platform Engineer.',
    color: 'purple',
    posts: [
      {
        title: 'Platform Engineering for Solo Builders',
        slug: '2026-03-03-platform-engineering-solo-saas',
        description: 'Apply enterprise-grade platform patterns to indie projects without the overhead.',
      },
      {
        title: 'The Greybeard Platform Engineering Pack',
        slug: '2026-03-15-greybeard-platform-engineering-pack',
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
        slug: '2026-01-01-why-I-switched-to-unifi',
        description: "An honest look at UniFi: the good, the trade-offs, and who it's for.",
      },
      {
        title: 'Pi-hole for Homelab DNS and Wildcard Records',
        slug: '2026-01-16-pihole-homelab-dns',
        description: 'Block ads network-wide and use Pi-hole as your homelab internal DNS resolver.',
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
  amber: {
    border: 'border-amber-200 dark:border-amber-900/40',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    badge: 'bg-amber-100 dark:bg-amber-900/40',
    badgeText: 'text-amber-700 dark:text-amber-300',
    link: 'text-amber-700 hover:text-amber-900 dark:text-amber-400 dark:hover:text-amber-200',
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
  const showNewsletter = beehiivUrl && beehiivUrl !== 'undefined';

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight dark:text-zinc-100">Start Here</h1>

      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">
        New here? This page cuts through the archive and points you to the best starting
        point based on what you want to learn.
      </p>

      {/* Who is this for */}
      <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-800/50">
        <h2 className="font-semibold dark:text-zinc-100">What is Brian&apos;s Tech Corner?</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          I&apos;m Brian, a Staff Platform Engineer by day and homelab builder by night. This
          site is where I write about the tools and decisions I actually use: Kubernetes,
          platform engineering, AI integrations, and homelab infrastructure. Real configs,
          real trade-offs, no filler.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/about"
            className="text-sm font-medium text-zinc-700 underline underline-offset-4 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
          >
            Full about page
          </Link>
          <a
            href={discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-zinc-700 underline underline-offset-4 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
          >
            Join the Discord
          </a>
          {showNewsletter && (
            <a
              href={beehiivUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-zinc-700 underline underline-offset-4 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
            >
              Subscribe to the newsletter
            </a>
          )}
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

      {/* Stay connected */}
      <section className="mt-16 space-y-4">
        <h2 className="text-xl font-semibold dark:text-zinc-100">Stay Connected</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Newsletter */}
          {showNewsletter && (
            <a
              href={beehiivUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl border border-blue-200 bg-blue-50 p-5 transition hover:border-blue-300 hover:bg-blue-100 dark:border-blue-900/40 dark:bg-blue-950/30 dark:hover:bg-blue-950/50"
            >
              <div className="text-lg font-semibold text-blue-900 dark:text-blue-200">Newsletter</div>
              <p className="mt-1 text-sm text-blue-800 dark:text-blue-300">
                One email a week: Kubernetes deep dives, homelab builds, AI tooling, and
                platform engineering from someone who does this for real.
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-blue-700 underline underline-offset-4 group-hover:text-blue-900 dark:text-blue-400 dark:group-hover:text-blue-200">
                Subscribe free
              </span>
            </a>
          )}

          {/* Discord */}
          <a
            href={discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-indigo-200 bg-indigo-50 p-5 transition hover:border-indigo-300 hover:bg-indigo-100 dark:border-indigo-900/40 dark:bg-indigo-950/30 dark:hover:bg-indigo-950/50"
          >
            <div className="text-lg font-semibold text-indigo-900 dark:text-indigo-200">Discord Community</div>
            <p className="mt-1 text-sm text-indigo-800 dark:text-indigo-300">
              Ask questions, share your homelab, get unstuck. Channels for Kubernetes,
              homelab, platform engineering, and AI tooling.
            </p>
            <span className="mt-3 inline-block text-sm font-medium text-indigo-700 underline underline-offset-4 group-hover:text-indigo-900 dark:text-indigo-400 dark:group-hover:text-indigo-200">
              Join the server
            </span>
          </a>
        </div>
      </section>

      {/* Browse everything CTA */}
      <div className="mt-12 text-center">
        <p className="text-zinc-600 dark:text-zinc-400">Ready to explore everything?</p>
        <Link
          href="/blog"
          className="mt-3 inline-block rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Browse all posts
        </Link>
      </div>
    </main>
  );
}
