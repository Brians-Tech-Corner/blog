export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose prose-zinc max-w-none prose-headings:scroll-mt-24 prose-pre:rounded-xl prose-pre:border prose-pre:border-zinc-200 prose-pre:bg-zinc-50 dark:prose-invert dark:prose-pre:border-zinc-700 dark:prose-pre:bg-zinc-800/50">
      {children}
    </div>
  );
}
