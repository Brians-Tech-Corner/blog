import type { Metadata } from 'next';
import { discordUrl } from '@/lib/social-links';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brianstechcorner.com';

const ogImage = `${siteUrl}/api/og?${new URLSearchParams({
  title: 'Resources',
  description: 'Tools, gear, and services I actually use for homelabs, platform engineering, and building in public.',
}).toString()}`;

export const metadata: Metadata = {
  title: 'Resources',
  description:
    'Tools, gear, and services I actually use for homelabs, platform engineering, and building in public. Curated recommendations with no fluff.',
  alternates: {
    canonical: `${siteUrl}/resources`,
  },
  openGraph: {
    title: "Resources | Brian's Tech Corner",
    description:
      'Tools, gear, and services I actually use for homelabs, platform engineering, and building in public.',
    url: `${siteUrl}/resources`,
    siteName: "Brian's Tech Corner",
    type: 'website',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Resources | Brian's Tech Corner",
    description:
      'Tools, gear, and services I actually use for homelabs, platform engineering, and building in public.',
    images: [ogImage],
  },
};

const linkClassName =
  'font-medium text-blue-600 underline decoration-blue-300 underline-offset-4 hover:text-blue-800 dark:text-blue-400 dark:decoration-blue-600 dark:hover:text-blue-200';

interface Resource {
  name: string;
  description: string;
  href: string;
  badge?: string;
}

interface ResourceCategory {
  title: string;
  description: string;
  items: Resource[];
}

const categories: ResourceCategory[] = [
  {
    title: 'Homelab Hardware',
    description: 'The physical gear running my homelab. Mini PCs are the sweet spot for power-efficient, capable nodes.',
    items: [
      {
        name: 'Beelink Mini PCs (EQ12, EQ14)',
        description:
          'My go-to for Kubernetes nodes. Intel N100/N150, fanless options, ~10W idle. Great price-to-performance for homelab Kubernetes clusters.',
        href: 'https://www.amazon.com/s?k=beelink+mini+pc+n100',
        badge: 'What I Run',
      },
      {
        name: 'UniFi Dream Machine (UDM)',
        description:
          'The router/firewall/switch combo I switched to after years of prosumer gear. VLAN support, great UI, and solid reliability.',
        href: 'https://store.ui.com',
        badge: 'What I Run',
      },
      {
        name: 'Raspberry Pi 5',
        description:
          'Still useful for lightweight control plane duties, Pi-hole DNS, and edge automation tasks. Pi 5 is a big jump over Pi 4.',
        href: 'https://www.raspberrypi.com/products/raspberry-pi-5/',
      },
      {
        name: 'Synology NAS (DS923+)',
        description:
          'Network storage for backups, media, and persistent volume backing. Synology\'s DSM is mature and the ecosystem is solid.',
        href: 'https://www.synology.com/en-us/products/DS923+',
      },
    ],
  },
  {
    title: 'Platform Engineering & DevOps Tools',
    description: 'The SaaS tools and platforms I reach for in day-to-day platform engineering work.',
    items: [
      {
        name: 'Port.io',
        description:
          'Internal Developer Portal that actually works. I use it to build self-service scaffolding for teams. Generous free tier for individuals.',
        href: 'https://www.getport.io',
        badge: 'Recommended',
      },
      {
        name: 'SonarCloud',
        description:
          'Static analysis and code quality for open source projects. Free for public repos. Great signal for PRs without managing your own SonarQube.',
        href: 'https://sonarcloud.io',
        badge: 'Recommended',
      },
      {
        name: 'Terraform / OpenTofu',
        description:
          'Infrastructure as code. I use Terraform at work and OpenTofu for personal projects since the license change. Both work great with Proxmox, AWS, and Cloudflare.',
        href: 'https://opentofu.org',
      },
      {
        name: 'ArgoCD',
        description:
          'GitOps continuous delivery for Kubernetes. Declarative, git-driven, and free. My homelab and personal k8s clusters all use ArgoCD.',
        href: 'https://argo-cd.readthedocs.io',
        badge: 'What I Run',
      },
      {
        name: 'Grafana OSS',
        description:
          'Dashboards, alerting, and observability. I run Grafana + Prometheus + Loki in my homelab. The open source stack is genuinely excellent.',
        href: 'https://grafana.com/oss/',
        badge: 'What I Run',
      },
    ],
  },
  {
    title: 'Developer Tools & Productivity',
    description: 'Software tools that show up in my daily workflow.',
    items: [
      {
        name: 'Cursor',
        description:
          'AI-powered code editor built on VS Code. The best coding experience I\'ve had. Tab completion that actually understands context.',
        href: 'https://www.cursor.com',
        badge: 'Daily Driver',
      },
      {
        name: 'Claude (Anthropic)',
        description:
          'My go-to LLM for coding, writing, and architecture thinking. Claude\'s ability to handle long context and complex reasoning makes it ideal for technical work.',
        href: 'https://claude.ai',
        badge: 'Daily Driver',
      },
      {
        name: 'GitHub',
        description:
          'Source control, CI/CD, and project management. GitHub Actions is my default CI for open source projects.',
        href: 'https://github.com',
      },
      {
        name: 'Cloudflare',
        description:
          'DNS, CDN, Tunnels, and R2 storage. The free tier covers most indie hacker/homelab needs. Cloudflare Tunnels are great for exposing homelab services without port forwarding.',
        href: 'https://cloudflare.com',
        badge: 'Recommended',
      },
    ],
  },
  {
    title: 'Hosting & Infrastructure',
    description: 'Platforms I use or recommend for hosting apps and APIs.',
    items: [
      {
        name: 'Vercel',
        description:
          'Where this blog is hosted. Frictionless Next.js deployments with excellent edge performance. Free tier is generous for personal projects.',
        href: 'https://vercel.com',
        badge: 'What I Use',
      },
      {
        name: 'Railway',
        description:
          'The easiest way to deploy backend services and databases. I use it for Herp Ops side project APIs. No Kubernetes required — just push and it runs.',
        href: 'https://railway.app',
        badge: 'What I Use',
      },
      {
        name: 'Hetzner',
        description:
          'Affordable dedicated and cloud servers in Europe. Great for VPS workloads where AWS/GCP pricing is overkill.',
        href: 'https://www.hetzner.com',
      },
      {
        name: 'Proxmox VE',
        description:
          'Open source hypervisor I run at home for VM management. Free, powerful, and battle-tested. The foundation of my homelab Kubernetes setup.',
        href: 'https://www.proxmox.com/en/proxmox-virtual-environment',
        badge: 'What I Run',
      },
    ],
  },
  {
    title: 'Learning Resources',
    description: 'Books, courses, and content worth your time for platform engineering and infrastructure.',
    items: [
      {
        name: 'Platform Engineering on Kubernetes (O\'Reilly)',
        description:
          'The best book on building production-grade platforms on top of Kubernetes. Covers cloud-native patterns, GitOps, and developer experience.',
        href: 'https://www.oreilly.com/library/view/platform-engineering-on/9781617298ferr/',
      },
      {
        name: 'The Phoenix Project',
        description:
          'The novel that explains DevOps culture better than any technical book. Required reading for engineers moving into platform roles.',
        href: 'https://itrevolution.com/product/the-phoenix-project/',
      },
      {
        name: 'Kubernetes Documentation',
        description:
          'Genuinely great docs. The concepts section is required reading before touching any homelab or production k8s cluster.',
        href: 'https://kubernetes.io/docs/home/',
      },
      {
        name: 'TechWorld with Nana (YouTube)',
        description:
          'Best YouTube channel for Kubernetes and DevOps tutorials. Clear, practical, and well-structured.',
        href: 'https://www.youtube.com/@TechWorldwithNana',
      },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight dark:text-zinc-100">Resources</h1>

      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">
        Tools, gear, and services I actually use — curated from building homelabs, running
        platform engineering at scale, and shipping indie software. Recommendations are based
        on real use, and any sponsored features or paid placements are clearly labeled.
      </p>

      <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
        Some links may be affiliate links or feature partners. If you purchase through them I
        may earn a small commission at no extra cost to you. I only recommend things I use
        myself, and any paid relationships are explicitly disclosed.
      </p>

      <div className="mt-12 space-y-16">
        {categories.map((category) => (
          <section key={category.title}>
            <h2 className="text-xl font-semibold dark:text-zinc-100">{category.title}</h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{category.description}</p>

            <div className="mt-6 divide-y divide-zinc-100 rounded-2xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-700">
              {category.items.map((item) => (
                <div key={item.name} className="flex items-start justify-between gap-4 p-5">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClassName}
                      >
                        {item.name}
                      </a>
                      {item.badge && (
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-800/50">
        <h2 className="font-semibold dark:text-zinc-100">Missing something?</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          If you&apos;re looking for a recommendation on a specific tool or have a suggestion,
          reach out on{' '}
          <a
            href={discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            Discord
          </a>{' '}
          or{' '}
          <a
            href="https://x.com/brianstechcorn"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            X (Twitter)
          </a>
          .
        </p>
      </div>
    </main>
  );
}
