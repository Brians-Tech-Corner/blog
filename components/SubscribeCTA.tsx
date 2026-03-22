type SubscribeCTAProps = {
  variant?: 'full' | 'inline';
};

export function SubscribeCTA({ variant = 'full' }: SubscribeCTAProps = {}) {
  const beehiivUrl = process.env.NEXT_PUBLIC_BEEHIIV_URL;
  if (!beehiivUrl || beehiivUrl === 'undefined') {
    return null;
  }

  if (variant === 'inline') {
    return (
      <aside className="my-8 rounded-xl border border-blue-200 bg-blue-50 px-6 py-5 dark:border-blue-900/40 dark:bg-blue-950/50">
        <p className="font-semibold text-blue-900 dark:text-blue-200">
          Enjoying this? Get more in your inbox.
        </p>
        <p className="mt-1 text-sm text-blue-800 dark:text-blue-300">
          One email a week: Kubernetes, homelab builds, platform tooling, and AI integrations
          from someone who does this for a living.
        </p>
        <a
          href={beehiivUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Subscribe free
        </a>
      </aside>
    );
  }

  return (
    <section className="my-12 rounded-2xl border border-blue-200 bg-blue-50 p-8 text-center dark:border-blue-900/40 dark:bg-blue-950">
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-blue-900 dark:text-blue-200">
        Real-World Platform Engineering in Your Inbox
      </h2>
      <p className="mb-2 text-blue-800 dark:text-blue-300">
        One email a week. Deep dives on Kubernetes, homelab builds, platform tooling, and
        building in public from someone who does this for a living.
      </p>
      <p className="mb-6 text-sm text-blue-700 dark:text-blue-400">
        No fluff, no sponsored blasts. Unsubscribe any time.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a
          href={beehiivUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Subscribe, it&apos;s free
        </a>
      </div>
    </section>
  );
}
