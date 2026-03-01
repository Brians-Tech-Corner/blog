import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brianstechcorner.com';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    "Open source tools and side projects built by Brian — including Greybeard, ProxiClaw, and Herp Ops.",
  alternates: { canonical: `${siteUrl}/projects` },
  openGraph: {
    title: 'Projects | Brian\'s Tech Corner',
    description: "Open source tools and side projects built by Brian — including Greybeard, ProxiClaw, and Herp Ops.",
    url: `${siteUrl}/projects`,
    siteName: "Brian's Tech Corner",
    type: 'website',
    images: [
      {
        url: `${siteUrl}/api/og?${new URLSearchParams({ title: 'Projects', description: 'Open source tools and side projects — Greybeard, ProxiClaw, Herp Ops' }).toString()}`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Projects | Brian's Tech Corner",
    description: "Open source tools and side projects built by Brian — including Greybeard, ProxiClaw, and Herp Ops.",
    images: [
      `${siteUrl}/api/og?${new URLSearchParams({ title: 'Projects', description: 'Open source tools and side projects — Greybeard, ProxiClaw, Herp Ops' }).toString()}`,
    ],
  },
};

const PROJECTS = [
  {
    name: 'Greybeard',
    tagline: 'Staff-level AI code review assistant',
    description:
      'A CLI + MCP server that channels the calm, battle-tested wisdom of a Staff Engineer into every code review. Surfaces failure modes, ownership gaps, and operational cost. Supports OpenAI, Anthropic, and local models via Ollama. Content packs let you swap perspectives — from on-call engineer to solutions architect.',
    tags: ['Python', 'CLI', 'MCP', 'AI', 'Open Source'],
    github: 'https://github.com/btotharye/greybeard',
    docs: 'https://greybeard.readthedocs.io',
    docsLabel: 'Docs →',
    status: 'active',
  },
  {
    name: 'ProxiClaw',
    tagline: 'Personal AI assistant running inside OpenClaw',
    description:
      'An AI agent with persistent memory, tool integrations, and context-aware assistance. Wired into GitHub, Jira, Notion, Railway, and more — can take action across your stack, not just answer questions.',
    tags: ['AI', 'Automation', 'OpenClaw', 'TypeScript'],
    github: null,
    docs: null,
    docsLabel: null,
    status: 'active',
  },
  {
    name: 'Herp Ops',
    tagline: 'Reptile care management SaaS',
    description:
      'A full-stack SaaS for reptile keepers — feeding logs, health records, weight tracking, breeding logs, and QR-code profiles. Built with Next.js, FastAPI, and Railway. A real-world platform engineering case study: Auth0, SonarCloud, Terraform, Port.io, and a floating AI chat widget all in one.',
    tags: ['Next.js', 'FastAPI', 'Python', 'SaaS', 'Platform Engineering'],
    github: 'https://github.com/Herp-Ops',
    docs: 'https://www.herpops.com',
    docsLabel: 'App →',
    docsLabel: 'App →',
    status: 'active',
  },
];

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  beta: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  archived: 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400',
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-14">
      <h1 className="text-3xl font-bold tracking-tight dark:text-zinc-100">Projects</h1>
      <p className="mt-3 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
        Open source tools and side projects I&apos;m actively building. Some are utilities for
        engineers, some are SaaS products, all are built and documented in public.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <div
            key={project.name}
            className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
          >
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {project.name}
              </h2>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusColors[project.status]}`}
              >
                {project.status}
              </span>
            </div>

            <p className="mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {project.tagline}
            </p>

            <p className="mt-3 flex-1 text-sm text-zinc-600 dark:text-zinc-300">
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {(project.github || project.docs) && (
              <div className="mt-4 flex gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-700">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                  >
                    GitHub →
                  </a>
                )}
                {project.docs && (
                  <a
                    href={project.docs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
                  >
                    {project.docsLabel ?? 'Docs →'}
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
