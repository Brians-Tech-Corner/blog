export function SponsorshipCTA() {
  return (
    <section className="my-12 rounded-2xl border border-amber-200 bg-amber-50 p-8 dark:border-amber-900/40 dark:bg-amber-950">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-amber-900 dark:text-amber-200">
            Interested in Sponsoring?
          </h2>
          <p className="mt-2 text-amber-800 dark:text-amber-300">
            I write for platform engineers, staff engineers, and technical leaders in the DevOps/SRE
            space. My audience makes infrastructure decisions.
          </p>
          <p className="mt-3 text-sm text-amber-700 dark:text-amber-400">
            Featured posts reach 10k+ engineering professionals. Reach out to discuss partnership
            opportunities.
          </p>
        </div>
        <a
          href="mailto:hello@example.com?subject=Sponsorship%20Inquiry"
          className="mt-2 flex-shrink-0 whitespace-nowrap rounded-lg bg-amber-600 px-4 py-2 text-white shadow transition hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-400 sm:mt-0"
        >
          Get in Touch
        </a>
      </div>
    </section>
  );
}
