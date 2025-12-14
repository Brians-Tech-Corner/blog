import GithubSlugger from 'github-slugger';

export type TocHeading = {
  id: string;
  text: string;
  level: number; // 2 = h2, 3 = h3, etc.
};

/**
 * Extracts heading structure from MDX content for table of contents
 * Supports h2 and h3 headings
 * Uses github-slugger to match rehype-slug's ID generation
 */
export function extractTocHeadings(content: string): TocHeading[] {
  const headings: TocHeading[] = [];
  const slugger = new GithubSlugger();

  // Match h2 and h3 markdown headings
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;

  // Extract all matches using matchAll for better readability
  const matches = Array.from(content.matchAll(headingRegex));

  for (const match of matches) {
    const level = match[1].length;
    const text = match[2].trim();

    // Use github-slugger to generate IDs matching rehype-slug
    const id = slugger.slug(text);

    headings.push({ id, text, level });
  }

  return headings;
}
