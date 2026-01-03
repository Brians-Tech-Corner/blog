import Link from 'next/link';
import { socialLinks } from '@/lib/social-links';

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-100 py-10 dark:border-zinc-800">
      <div className="mx-auto w-full max-w-5xl px-4 text-sm text-zinc-600 dark:text-zinc-400">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <div className="font-semibold text-zinc-900 dark:text-zinc-100">
              © {new Date().getFullYear()} Brian&apos;s Tech Corner
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span>Built with Next.js + MDX.</span>

              <Link
                href="/blog"
                className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
              >
                Blog
              </Link>

              <span>·</span>

              <Link
                href="/about"
                className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
              >
                About
              </Link>

              <span>·</span>

              <a
                href="/rss.xml"
                className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
              >
                RSS
              </a>

              <span>·</span>

              <Link
                href="/privacy"
                className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
              >
                Privacy
              </Link>
            </div>

            <p className="mt-3 max-w-3xl text-xs text-zinc-500 dark:text-zinc-500">
              This site documents personal projects and experiments. All content is shared
              for learning and exploration purposes.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Follow
            </div>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  aria-label={link.name}
                >
                  {link.icon({ className: 'h-5 w-5' })}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
