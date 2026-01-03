import type { Metadata } from 'next';
import { DiscordIcon, ExternalLinkIcon } from '@/lib/social-links';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brianstechcorner.com';

export const metadata: Metadata = {
  title: 'Discord Community',
  description:
    "Join Brian's Tech Corner Discord community to discuss homelabs, home automation, Kubernetes, and more. Get help, share projects, and connect with fellow enthusiasts.",
  alternates: {
    canonical: `${siteUrl}/discord`,
  },
  openGraph: {
    title: "Discord Community | Brian's Tech Corner",
    description:
      "Join the community to discuss homelabs, home automation, and self-hosted solutions. Get support and connect with fellow enthusiasts.",
    url: `${siteUrl}/discord`,
    siteName: "Brian's Tech Corner",
    type: 'website',
    images: [
      {
        url: `${siteUrl}/api/og?title=Discord Community&description=Join the conversation about homelabs and home automation`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Discord Community | Brian's Tech Corner",
    description:
      "Join the community to discuss homelabs, home automation, and self-hosted solutions. Get support and connect with fellow enthusiasts.",
    images: [
      `${siteUrl}/api/og?title=Discord Community&description=Join the conversation about homelabs and home automation`,
    ],
  },
};

export default function DiscordPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Join the Community</h1>

      <p className="mt-6 text-lg text-zinc-700 dark:text-zinc-300">
        Looking for a place to discuss homelabs, troubleshoot Kubernetes clusters, share home
        automation setups, or just chat about tech?
      </p>

      <p className="mt-4 text-lg text-zinc-700 dark:text-zinc-300">
        <strong>Join the Discord community.</strong>
      </p>

      {/* Discord Invite Card */}
      <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <DiscordIcon className="h-12 w-12 text-indigo-500" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">Brian&apos;s Tech Corner Discord</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              A friendly community for homelab enthusiasts and home automation nerds.
            </p>
            <a
              href="https://discord.gg/q2N7R2KDRs"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              Join Discord
              <ExternalLinkIcon className="ml-2" />
            </a>
          </div>
        </div>
      </div>

      {/* What to Expect Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight">What to Expect</h2>

        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              🏠 Homelab Discussions
            </h3>
            <p className="mt-2 text-zinc-700 dark:text-zinc-300">
              Share your homelab setups, ask for architecture advice, troubleshoot networking
              issues, or show off your rack builds. Whether you&apos;re running a single
              Raspberry Pi or a full server rack, everyone&apos;s welcome.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              🏡 Home Automation
            </h3>
            <p className="mt-2 text-zinc-700 dark:text-zinc-300">
              From Home Assistant to HomeKit, Zigbee to Z-Wave, discuss smart home setups,
              automation ideas, and integration challenges. Share your dashboards, automations,
              and DIY projects.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              ☸️ Kubernetes
            </h3>
            <p className="mt-2 text-zinc-700 dark:text-zinc-300">
              Talk about Kubernetes, Docker, containers, and infrastructure at home. Share your
              homelab K8s setups, troubleshoot deployments, and learn together.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              🎮 Off-Topic & Gaming
            </h3>
            <p className="mt-2 text-zinc-700 dark:text-zinc-300">
              Not everything has to be serious tech talk. Share what you&apos;re playing, chat
              about game server hosting, or just hang out.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              💬 Blog & Video Support
            </h3>
            <p className="mt-2 text-zinc-700 dark:text-zinc-300">
              Have questions about a blog post or video? Found an issue with a tutorial? The
              support channel is there to help you work through it.
            </p>
          </div>
        </div>
      </div>

      {/* Community Guidelines */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight">Community Guidelines</h2>

        <ul className="mt-6 space-y-3 text-zinc-700 dark:text-zinc-300">
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span>Be respectful and constructive. We&apos;re all learning.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span>
              Ask questions. There are no stupid questions, only questions not yet asked.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span>Share what you&apos;ve built. Everyone loves a good show-and-tell.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <span>Help others when you can. We all started somewhere.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-500">✗</span>
            <span>
              No spam, self-promotion without context, or off-topic sales pitches.
            </span>
          </li>
        </ul>
      </div>

      {/* CTA Section */}
      <div className="mt-12 rounded-lg border border-indigo-200 bg-indigo-50 p-6 dark:border-indigo-900 dark:bg-indigo-950/30">
        <h2 className="text-xl font-semibold text-indigo-900 dark:text-indigo-100">
          Ready to join?
        </h2>
        <p className="mt-2 text-indigo-800 dark:text-indigo-200">
          Click the button below to get your invite and start chatting with the community.
        </p>
        <a
          href="https://discord.gg/q2N7R2KDRs"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          Join the Discord
          <ExternalLinkIcon className="ml-2" />
        </a>
      </div>

      <p className="mt-8 text-sm text-zinc-600 dark:text-zinc-400">
        See you in the server! 👋
      </p>
    </main>
  );
}
