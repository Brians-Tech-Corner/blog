import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brianstechcorner.com';

const ogImage = `${siteUrl}/api/og?${new URLSearchParams({ title: 'About', description: 'Staff Platform Engineer writing about platform engineering, homelabs, and open source' }).toString()}`;
const twitterImage = `${siteUrl}/api/og?${new URLSearchParams({ title: 'About', description: 'Staff Platform Engineer writing about platform engineering and homelabs' }).toString()}`;

export const metadata: Metadata = {
  title: 'About',
  description:
    "Brian is a Staff Platform Engineer who writes about platform engineering, homelabs, open source tooling, and building production SaaS products in public.",
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: "About | Brian's Tech Corner",
    description:
      "Staff Platform Engineer writing about platform engineering, homelabs, open source, and building in public.",
    url: `${siteUrl}/about`,
    siteName: "Brian's Tech Corner",
    type: 'website',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "About | Brian's Tech Corner",
    description:
      "Staff Platform Engineer writing about platform engineering, homelabs, open source, and building in public.",
    images: [twitterImage],
  },
};

const linkClassName =
  'text-zinc-700 underline decoration-zinc-400 underline-offset-4 hover:text-zinc-900 dark:text-zinc-300 dark:decoration-zinc-600 dark:hover:text-zinc-100';

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">About</h1>

      <p className="mt-6 text-lg text-zinc-700 dark:text-zinc-300">
        Hey, I&apos;m Brian &mdash; Staff Platform Engineer by day, open source builder and homelab
        tinkerer by night.
      </p>

      <h2 className="mt-10 text-xl font-semibold">What You&apos;ll Find Here</h2>

      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        This site is my public notebook &mdash; a mix of platform engineering deep-dives,
        homelab projects, and documentation for the open source tools I build. Main topics:
      </p>

      <ul className="mt-4 list-inside list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
        <li>
          <strong>Platform engineering</strong> &mdash; internal developer platforms, developer
          experience, Terraform, Port.io, SonarCloud, CI/CD, and everything that makes
          engineering teams move faster
        </li>
        <li>
          <strong>Open source projects</strong> &mdash;&nbsp;
          <a href="https://github.com/btotharye/greybeard" className={linkClassName} target="_blank" rel="noopener noreferrer">Greybeard</a>
          {' '}(AI code reviewer), ProxiClaw (personal AI agent), and whatever I build next
        </li>
        <li>
          <strong>Building in public</strong> &mdash; documenting{' '}
          <a href="https://www.herpops.com" className={linkClassName} target="_blank" rel="noopener noreferrer">Herp Ops</a>,
          a reptile care SaaS I&apos;m building solo &mdash; from architecture decisions to
          production incidents
        </li>
        <li>
          <strong>Homelab projects</strong> &mdash; Kubernetes on Mini PCs, self-hosted services,
          GitOps, and infrastructure experimentation
        </li>
        <li>
          <strong>Home automation</strong> &mdash; Home Assistant, smart home setups, and
          automation workflows
        </li>
        <li>
          <strong>Home networking</strong> &mdash; VLANs, DNS, firewalls, and UniFi gear
        </li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold">Background</h2>

      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        By day I work as a Staff Platform Engineer &mdash; building internal developer platforms,
        managing infrastructure at scale, and helping engineering teams ship faster.
        The tools I reach for at work (Kubernetes, Terraform, GitOps, observability stacks)
        are the same ones I run at home, just scaled way down.
      </p>

      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Outside of the day job I build open source tools and a SaaS product.{' '}
        <a href="https://github.com/btotharye/greybeard" className={linkClassName} target="_blank" rel="noopener noreferrer">Greybeard</a>{' '}
        is an AI code reviewer that models how Staff engineers think about systems.{' '}
        <a href="https://www.herpops.com" className={linkClassName} target="_blank" rel="noopener noreferrer">Herp Ops</a>{' '}
        is a reptile care SaaS I&apos;m building from scratch &mdash; it&apos;s as much a platform
        engineering case study as it is a product.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Why This Blog?</h2>

      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Writing forces me to think clearly. When I solve something tricky, build something
        useful, or make a decision I want to remember &mdash; I write it down here. Some posts
        are comprehensive guides, others are quick notes for future reference.
      </p>

      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        If it helps someone else along the way, even better.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Get in Touch</h2>

      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Always interested in connecting with other engineers, homelab nerds, and open
        source builders. Reach out on any of the links below.
      </p>

      <div className="mt-6 flex flex-wrap gap-4">
        <a
          href="https://github.com/btotharye"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit btotharye on GitHub"
          className={linkClassName}
        >
          GitHub
        </a>
        <a
          href="https://x.com/brianstechcorn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow Brian's Tech Corner on X (formerly Twitter)"
          className={linkClassName}
        >
          X (Twitter)
        </a>
        <a
          href="https://youtube.com/@brianstechcorner"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Subscribe to Brian's Tech Corner on YouTube"
          className={linkClassName}
        >
          YouTube
        </a>
        <a
          href="https://github.com/Brians-Tech-Corner"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Brian's Tech Corner on GitHub"
          className={linkClassName}
        >
          Brians Tech Corner GitHub
        </a>
      </div>
    </main>
  );
}
