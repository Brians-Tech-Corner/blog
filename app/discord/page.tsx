import type { Metadata } from 'next';

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
            {/* Discord Logo SVG */}
            <svg
              className="h-12 w-12 text-indigo-500"
              viewBox="0 0 71 55"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" />
            </svg>
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
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
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
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>

      <p className="mt-8 text-sm text-zinc-600 dark:text-zinc-400">
        See you in the server! 👋
      </p>
    </main>
  );
}
