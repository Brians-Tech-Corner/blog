import type { Metadata } from 'next';
import { discordUrl } from '@/lib/social-links';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brianstechcorner.com';
const sponsorEmail = process.env.NEXT_PUBLIC_SPONSOR_EMAIL ?? 'brian@brianstechcorner.com';

const ogImage = `${siteUrl}/api/og?${new URLSearchParams({
  title: 'Sponsor',
  description: "Reach platform engineers, DevOps leads, and homelab builders who evaluate and buy infrastructure tooling.",
}).toString()}`;

export const metadata: Metadata = {
  title: 'Sponsor',
  description:
    "Reach platform engineers, DevOps leads, and homelab builders who evaluate and buy infrastructure tooling. Sponsored posts, newsletter placements, and resource page features available.",
  alternates: {
    canonical: `${siteUrl}/sponsor`,
  },
  openGraph: {
    title: "Sponsor | Brian's Tech Corner",
    description:
      "Reach platform engineers, DevOps leads, and homelab builders who evaluate and buy infrastructure tooling.",
    url: `${siteUrl}/sponsor`,
    siteName: "Brian's Tech Corner",
    type: 'website',
    images: [{ url: ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sponsor | Brian's Tech Corner",
    description:
      "Reach platform engineers, DevOps leads, and homelab builders who evaluate and buy infrastructure tooling.",
    images: [ogImage],
  },
};

const formats = [
  {
    title: 'Sponsored Post',
    description:
      "A dedicated post written in my voice covering your tool, platform, or product. Includes a real hands-on walkthrough where I actually use what you're building - not a press release. Permanent placement, SEO-optimized, shared across all channels.",
    includes: [
      'Full post written by me in my style',
      'Honest, hands-on coverage',
      'Shared to Discord, X, and newsletter',
      'Permanent, no expiry',
      'Labeled as sponsored per FTC guidelines',
    ],
  },
  {
    title: 'Newsletter Placement',
    description:
      'A sponsored mention in the weekly newsletter. Short, direct, and written to a technical audience that actually reads what lands in their inbox. Good fit for product launches, new features, or time-sensitive promotions.',
    includes: [
      'Dedicated section in the newsletter',
      'Written to match editorial tone',
      'Link to your landing page or signup',
      'Labeled as sponsored',
    ],
  },
  {
    title: 'Resources Page Feature',
    description:
      "A permanent listing on the /resources page alongside the tools I personally use and recommend. The resources page is where readers go when they're actively evaluating tools. High buyer intent.",
    includes: [
      'Listed in the relevant category',
      'Custom description written by me',
      'Badge labeling (e.g., "Sponsor" or "Recommended")',
      'Permanent placement',
    ],
  },
];

const audience = [
  { label: 'Primary roles', value: 'Platform engineers, DevOps/SRE, homelab builders' },
  { label: 'Content focus', value: 'Kubernetes, homelab infrastructure, GitOps, AI tooling, platform engineering' },
  { label: 'Reader profile', value: 'Practitioners who evaluate, recommend, and buy infrastructure tooling at their companies' },
  { label: 'Community', value: 'Active Discord with homelab and platform engineering channels' },
];

const faqs = [
  {
    q: 'Do you write the sponsored content yourself?',
    a: "Yes. I write everything in my own voice. I won't publish content that reads like marketing copy. It has to be something I'd actually want to read. If that's not a fit, a sponsored post probably isn't the right format.",
  },
  {
    q: 'Do you only cover tools you actually use?',
    a: "For sponsored posts, I need to be able to actually try the product and form a real opinion. I won't write glowing coverage of something I haven't used. If your tool is genuinely good, that works in your favor.",
  },
  {
    q: 'How are sponsored posts disclosed?',
    a: 'All sponsored content is clearly labeled at the top of the post and in newsletter placements, per FTC guidelines. I keep the disclosure clear and upfront.',
  },
  {
    q: "What's the lead time?",
    a: 'Typically 2-4 weeks from agreement to publish for sponsored posts. Newsletter placements can move faster depending on scheduling.',
  },
  {
    q: 'Can I see examples of past sponsored content?',
    a: "I'll share examples on request. Reach out and I'll send over relevant samples.",
  },
];

export default function SponsorPage() {
  const mailtoLink = `mailto:${sponsorEmail}?subject=Sponsorship%20Inquiry%20-%20Brian's%20Tech%20Corner`;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight dark:text-zinc-100">Sponsor</h1>

      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">
        Brian's Tech Corner reaches platform engineers, DevOps leads, and homelab builders: the
        people who evaluate infrastructure tooling, write the Jira tickets for new platforms, and
        recommend tools to their teams.
      </p>

      <p className="mt-3 text-zinc-600 dark:text-zinc-300">
        This isn't a generic tech blog. The content is deep and practical: Kubernetes homelab
        builds, platform engineering patterns, AI tooling integrations, GitOps. Readers come here
        because they're building something, not just browsing.
      </p>

      {/* Audience */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold dark:text-zinc-100">The Audience</h2>
        <div className="mt-4 divide-y divide-zinc-100 rounded-2xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-700">
          {audience.map((item) => (
            <div key={item.label} className="flex gap-4 px-5 py-4">
              <span className="w-40 flex-shrink-0 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {item.label}
              </span>
              <span className="text-sm text-zinc-700 dark:text-zinc-300">{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Formats */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold dark:text-zinc-100">Sponsorship Formats</h2>
        <div className="mt-6 space-y-6">
          {formats.map((format) => (
            <div
              key={format.title}
              className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-700"
            >
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                {format.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{format.description}</p>
              <ul className="mt-4 space-y-1">
                {format.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="mt-0.5 text-blue-500">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Good fit */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold dark:text-zinc-100">Good Fits</h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Sponsorships work best when there's a genuine overlap with the audience. Things that tend
          to land well:
        </p>
        <ul className="mt-4 space-y-2">
          {[
            'Infrastructure and DevOps tooling (Kubernetes, GitOps, observability, CI/CD)',
            'Internal developer platforms and self-service tooling',
            'Homelab hardware: mini PCs, networking gear, NAS, storage',
            'AI coding assistants and developer productivity tools',
            'Cloud providers, VPS hosting, and managed infrastructure',
            'Security tooling for engineers and platform teams',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="mt-0.5 text-green-500">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold dark:text-zinc-100">FAQ</h2>
        <div className="mt-6 space-y-6">
          {faqs.map((faq) => (
            <div key={faq.q}>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{faq.q}</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-8 dark:border-amber-900/40 dark:bg-amber-950">
        <h2 className="text-xl font-bold text-amber-900 dark:text-amber-200">Get in Touch</h2>
        <p className="mt-2 text-amber-800 dark:text-amber-300">
          Send an email with a bit about your product and what you're looking to do. I'll get back
          to you within a couple of days.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={mailtoLink}
            className="inline-block rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            Email Me
          </a>
          <a
            href={discordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg border border-amber-300 bg-white px-6 py-3 font-semibold text-amber-800 shadow transition hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-400 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-200 dark:hover:bg-amber-900/50"
          >
            Message on Discord
          </a>
        </div>
      </section>
    </main>
  );
}
