export function SponsorshipCTA() {
  return (
    <section className="my-12 rounded-2xl border border-amber-200 bg-amber-50 p-8 dark:border-amber-900/40 dark:bg-amber-950">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-amber-900 dark:text-amber-200">
            Reach Engineers Who Build Platforms
          </h2>
          <p className="mt-2 text-amber-800 dark:text-amber-300">
            My readers are Staff Engineers, Platform Engineers, and DevOps/SRE leads — the people
            who evaluate, buy, and recommend infrastructure tooling at their companies.
          </p>
          <ul className="mt-3 space-y-1 text-sm text-amber-700 dark:text-amber-400">
            <li>→ Sponsored posts, newsletter placements, and resource page features available</li>
            <li>→ Audience: platform engineering, Kubernetes, GitOps, and homelab builders</li>
            <li>→ Formats tailored to technical audiences — no generic ad copy</li>
          </ul>
        </div>
        <a
          href="/sponsor"
          className="mt-2 flex-shrink-0 whitespace-nowrap rounded-lg bg-amber-600 px-4 py-2 text-white shadow transition hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-400 sm:mt-0"
        >
          See Formats
        </a>
      </div>
    </section>
  );
}
