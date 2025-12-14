import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-100">
      {/* Banner strip - responsive height */}
      <div className="relative h-48 sm:h-64 md:h-80 lg:h-[28rem] w-full overflow-hidden border-b border-zinc-200">
        <Image
          src="/brand/X-Banner-Black.jpg"
          alt="Brian's Tech Corner banner"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Nav bar */}
      <div className="bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3 sm:py-4">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 no-underline">
            <Image
              src="/brand/BTC-Logo--Blue.jpg"
              alt="BTC"
              width={32}
              height={32}
              className="rounded-lg sm:w-9 sm:h-9"
            />
            <span className="text-xs sm:text-sm font-semibold tracking-tight text-zinc-900">
              Brian&apos;s Tech Corner
            </span>
          </Link>

          <nav className="flex items-center gap-3 sm:gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs sm:text-sm text-zinc-700 no-underline hover:text-zinc-900"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/rss.xml"
              className="text-xs sm:text-sm text-zinc-700 no-underline hover:text-zinc-900"
            >
              RSS
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
