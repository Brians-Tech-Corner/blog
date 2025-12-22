import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-200px)] max-w-3xl flex-col items-center justify-center px-6 text-center">
      <div className="mb-8">
        <h1 className="text-9xl font-bold text-zinc-200 dark:text-zinc-800">404</h1>
      </div>

      <h2 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
        Page Not Found
      </h2>

      <p className="mb-8 max-w-md text-lg text-zinc-600 dark:text-zinc-400">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Go Home
        </Link>
        <Link
          href="/blog"
          className="rounded-lg border border-zinc-300 px-6 py-3 font-medium text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          View All Posts
        </Link>
      </div>
    </main>
  );
}
