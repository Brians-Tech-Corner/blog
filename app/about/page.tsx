import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brianstechcorner.com';

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Brian's Tech Corner - exploring homelabs, home automation, Kubernetes, and self-hosted solutions. Building and documenting things at home.",
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: "About | Brian's Tech Corner",
    description:
      "Learn about Brian's Tech Corner - exploring homelabs, home automation, Kubernetes, and self-hosted solutions. Building and documenting things at home.",
    url: `${siteUrl}/about`,
    siteName: "Brian's Tech Corner",
    type: 'website',
    images: [
      {
        url: `${siteUrl}/api/og?title=About&description=Exploring homelabs, home automation, and self-hosted solutions`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "About | Brian's Tech Corner",
    description:
      "Learn about Brian's Tech Corner - exploring homelabs, home automation, Kubernetes, and self-hosted solutions. Building and documenting things at home.",
    images: [
      `${siteUrl}/api/og?title=About&description=Exploring homelabs, home automation, and self-hosted solutions`,
    ],
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">About</h1>

      <p className="mt-6 text-lg text-zinc-700 dark:text-zinc-300">
        Hey, I&apos;m Brian — welcome to my corner of the internet where I document my
        homelab and home automation projects.
      </p>

      <h2 className="mt-10 text-xl font-semibold">What You&apos;ll Find Here</h2>

      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        This site is all about building, breaking, and learning through hands-on projects
        at home. The main focus areas are:
      </p>

      <ul className="mt-4 list-inside list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
        <li>
          <strong>Homelab projects</strong> — running Kubernetes on Mini PC&apos;s and other devices,
          self-hosted services, and infrastructure experimentation
        </li>
        <li>
          <strong>Home automation</strong> — Home Assistant integrations, smart home
          setups, and automation workflows
        </li>
        <li>
          <strong>Home networking</strong> — VLANs, DNS, firewalls, and everything needed
          to run services securely at home using UniFi products.
        </li>
        <li>
          <strong>Self-hosted solutions</strong> — alternatives to cloud services, local
          control, and privacy-focused tools
        </li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold">Background</h2>

      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        By day, I work in DevOps and platform engineering, which gives me exposure to
        enterprise-scale infrastructure. By night (and weekends), I bring those concepts
        home — scaled down, simplified, and adapted for a homelab environment where I learn and improve my
        skillset.
      </p>

      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        The goal here isn&apos;t to replicate production systems at home, but to learn,
        experiment, and have fun building things that actually work for me and my family.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Why This Blog?</h2>

      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        This site serves as my public notebook. When I solve a problem, configure
        something tricky, or build something useful, I document it here. Some posts are
        comprehensive guides, others are quick notes for future reference.
      </p>

      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        If it helps someone else along the way, even better. Everything shared here is for
        learning and experimentation purposes.
      </p>

      <h2 className="mt-10 text-xl font-semibold">Get in Touch</h2>

      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Feel free to reach out on social media or leave a comment on any post. I&apos;m always
        interested in hearing about other people&apos;s homelab setups and automation projects.
      </p>

      <div className="mt-6 flex gap-4">
        <a
          href="https://github.com/brians-tech-corner"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-700 underline decoration-zinc-400 underline-offset-4 hover:text-zinc-900 dark:text-zinc-300 dark:decoration-zinc-600 dark:hover:text-zinc-100"
        >
          GitHub
        </a>
        <a
          href="https://x.com/brianstechcorn"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-700 underline decoration-zinc-400 underline-offset-4 hover:text-zinc-900 dark:text-zinc-300 dark:decoration-zinc-600 dark:hover:text-zinc-100"
        >
          X (Twitter)
        </a>
        <a
          href="https://youtube.com/@brianstechcorner"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-700 underline decoration-zinc-400 underline-offset-4 hover:text-zinc-900 dark:text-zinc-300 dark:decoration-zinc-600 dark:hover:text-zinc-100"
        >
          YouTube
        </a>
      </div>
    </main>
  );
}
