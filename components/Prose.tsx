export function Prose({ children }: { children: React.ReactNode }) {
  return (
    {/* 
      The `prose-headings:scroll-mt-24` utility sets a scroll margin (6rem) for all headings.
      This ensures that when navigating to a heading via anchor link, the heading is not hidden behind the sticky header.
      The value (24 = 6rem) matches the sticky header's height. If the header height changes, update this value accordingly.
    */}
    <div className="prose prose-zinc max-w-none prose-headings:scroll-mt-24 prose-pre:rounded-xl prose-pre:border prose-pre:border-zinc-200 prose-pre:bg-zinc-50 dark:prose-invert dark:prose-pre:border-zinc-700 dark:prose-pre:bg-zinc-800/50">
      {children}
    </div>
  );
}
