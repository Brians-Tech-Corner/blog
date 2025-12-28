import type { Metadata } from 'next';
import Link from 'next/link';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://brianstechcorner.com';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for Brian&apos;s Tech Corner - how we handle your data and analytics.',
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  // Consistent link styling across the page
  const linkClassName =
    'text-zinc-700 underline decoration-zinc-400 underline-offset-4 hover:text-zinc-900 dark:text-zinc-300 dark:decoration-zinc-600 dark:hover:text-zinc-100';

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>

      <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
        Last updated: December 28, 2025
      </p>

      <div className="mt-8 space-y-8 text-zinc-600 dark:text-zinc-400">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Overview
          </h2>
          <p>
            Brian&apos;s Tech Corner respects your privacy. This site is built with
            privacy in mind and collects minimal data necessary to understand how the
            site is used and to improve the content.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Analytics
          </h2>
          <p className="mb-3">
            This site uses{' '}
            <a
              href="https://vercel.com/docs/analytics"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              Vercel Analytics
            </a>{' '}
            to collect anonymous usage data. This includes:
          </p>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>Page views and visitor counts</li>
            <li>Referral sources (where visitors come from)</li>
            <li>General geographic location (country/region level)</li>
            <li>Device type and browser information</li>
          </ul>
          <p className="mt-3">
            <strong>Vercel Analytics is privacy-friendly:</strong> It does not use
            cookies, does not track you across sites, and does not collect personally
            identifiable information (PII). No IP addresses are stored.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Comments (Giscus)
          </h2>
          <p className="mb-3">
            Blog post comments are powered by{' '}
            <a
              href="https://giscus.app"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              Giscus
            </a>
            , which uses GitHub Discussions. When you leave a comment:
          </p>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>You authenticate with your GitHub account</li>
            <li>Your GitHub username and avatar are visible</li>
            <li>
              Comments are stored in this site&apos;s GitHub repository&apos;s
              Discussions
            </li>
          </ul>
          <p className="mt-3">
            Giscus and GitHub&apos;s privacy policies apply to comment data. You can
            delete your comments at any time through GitHub.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Cookies and Local Storage
          </h2>
          <p className="mb-3">
            <strong>This site does not use cookies.</strong> No tracking cookies,
            analytics cookies, or third-party cookies are set.
          </p>
          <p>
            The only data stored locally on your device is:
          </p>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>
              <strong>Theme preference</strong> - Saved in browser local storage to
              remember your light/dark mode choice across visits
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Third-Party Links
          </h2>
          <p>
            This site contains links to external websites (GitHub, YouTube, X/Twitter,
            etc.). These external sites have their own privacy policies, which I do not
            control.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Data Storage and Security
          </h2>
          <p>
            This is a static site hosted on Vercel. No user data is stored on servers
            controlled by this site beyond what Vercel Analytics collects (anonymous
            analytics) and what GitHub stores (public comments via Discussions).
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Your Rights
          </h2>
          <p className="mb-3">You have the right to:</p>
          <ul className="list-inside list-disc space-y-2 pl-4">
            <li>Opt out of analytics by using browser privacy features or ad blockers</li>
            <li>Delete your comments through GitHub Discussions</li>
            <li>Contact me with privacy concerns (see below)</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Changes to This Policy
          </h2>
          <p>
            This privacy policy may be updated occasionally. The &quot;Last updated&quot;
            date at the top will reflect any changes.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Contact
          </h2>
          <p>
            If you have questions about this privacy policy, you can reach out via{' '}
            <a
              href="https://github.com/brians-tech-corner"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              GitHub
            </a>{' '}
            or{' '}
            <a
              href="https://x.com/brianstechcorn"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              X/Twitter
            </a>
            .
          </p>
        </section>

        <div className="mt-10 border-t border-zinc-200 pt-8 dark:border-zinc-800">
          <Link href="/" className={linkClassName}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
