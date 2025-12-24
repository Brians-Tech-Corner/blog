import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brianstechcorner.com';

export const metadata: Metadata = {
  title: 'About',
  description:
    "Learn about Brian's Tech Corner - a personal space for documenting homelab projects, automation, infrastructure, and backend development.",
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: "About | Brian's Tech Corner",
    description:
      "Learn about Brian's Tech Corner - a personal space for documenting homelab projects, automation, infrastructure, and backend development.",
    url: `${siteUrl}/about`,
    siteName: "Brian's Tech Corner",
    type: 'website',
    images: [
      {
        url: `${siteUrl}/api/og?title=About&description=A personal space for documenting homelab projects, automation, and infrastructure`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "About | Brian's Tech Corner",
    description:
      "Learn about Brian's Tech Corner - a personal space for documenting homelab projects, automation, infrastructure, and backend development.",
    images: [
      `${siteUrl}/api/og?title=About&description=A personal space for documenting homelab projects, automation, and infrastructure`,
    ],
  },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">About</h1>

      <p className="mt-6 text-muted-foreground">
        Brian’s Tech Corner is a personal space for documenting things I’m building,
        experimenting with, and learning about.
      </p>

      <p className="mt-4 text-muted-foreground">
        Most of what you’ll find here revolves around homelabs, automation,
        infrastructure, home networking, and backend projects — all approached from a
        practical, hands-on perspective.
      </p>

      <p className="mt-4 text-muted-foreground">
        This site acts as a living notebook. Some posts are polished guides, others are
        snapshots in time as systems evolve.
      </p>

      <p className="mt-4 text-muted-foreground">
        Everything here is shared for learning and experimentation purposes.
      </p>
    </main>
  );
}
