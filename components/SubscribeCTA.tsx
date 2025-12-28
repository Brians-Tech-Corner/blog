import Link from 'next/link';

export function SubscribeCTA() {
  const beehiivUrl = process.env.NEXT_PUBLIC_BEEHIIV_URL;
  if (!beehiivUrl || beehiivUrl === 'undefined') {
    // Optionally render nothing or a warning if the URL is missing or set to 'undefined'
    return null;
  }
  return (
    <section className="my-12 rounded-2xl border border-blue-200 bg-blue-50 p-8 text-center dark:border-blue-900/40 dark:bg-blue-950">
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-blue-900 dark:text-blue-200">
        Get New Posts in Your Inbox
      </h2>
      <p className="mb-6 text-blue-800 dark:text-blue-300">
        Subscribe to the newsletter for fresh homelab, automation, and dev content. No spam, ever.
      </p>
      <Link
        href={beehiivUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Subscribe on Beehiiv
      </Link>
    </section>
  );
}
