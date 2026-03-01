import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';
import { headerSocialLinks } from '@/lib/social-links';

const links = [
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/discord', label: 'Discord' },
  { href: '/about', label: 'About' },
];

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-100 dark:border-zinc-800">
      {/* Hero header — replaces the banner image with a clean gradient */}
      <div className="w-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-blue-950 dark:from-zinc-950 dark:via-zinc-900 dark:to-blue-950">
        <div className="mx-auto flex w-full max-w-5xl items-center gap-5 px-4 py-8 sm:py-10">
          <Image
            src="/brand/BTC-Logo--Blue.jpg"
            alt="Brian's Tech Corner"
            width={64}
            height={64}
            className="rounded-xl ring-2 ring-white/10"
            priority
          />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              Brian&apos;s Tech Corner
            </h1>
            <p className="mt-1 text-sm text-zinc-400 sm:text-base">
              Platform engineering, homelabs, and open source — notes from the field.
            </p>
          </div>
        </div>
      </div>

      {/* Nav bar */}
      <div className="bg-white/80 backdrop-blur dark:bg-zinc-900/80">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3 sm:py-4">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 no-underline">
            <span className="text-xs sm:text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Home
            </span>
          </Link>

          <nav className="flex items-center gap-3 sm:gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs sm:text-sm text-zinc-700 no-underline hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/rss.xml"
              className="text-xs sm:text-sm text-zinc-700 no-underline hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
            >
              RSS
            </Link>

            {/* Social Links - Hidden on mobile */}
            <div className="hidden sm:flex items-center gap-2 ml-2 border-l border-zinc-200 dark:border-zinc-700 pl-3">
              {headerSocialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  aria-label={link.name}
                  title={link.name}
                >
                  {link.icon({ className: 'h-4 w-4' })}
                </a>
              ))}
            </div>

            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
