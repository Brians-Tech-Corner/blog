import { describe, it, expect } from 'vitest';
import { extractTocHeadings } from './toc';

describe('toc', () => {
  describe('extractTocHeadings', () => {
    it('should extract h2 and h3 headings', () => {
      const content = `## First Heading
Some content here

### Nested Heading
More content

## Second Heading
Final content`;

      const headings = extractTocHeadings(content);

      expect(headings).toEqual([
        { id: 'first-heading', text: 'First Heading', level: 2 },
        { id: 'nested-heading', text: 'Nested Heading', level: 3 },
        { id: 'second-heading', text: 'Second Heading', level: 2 },
      ]);
    });

    it('should handle headings with emojis', () => {
      const content = `## 👋 Welcome
## 🧠 What You'll Find Here`;

      const headings = extractTocHeadings(content);

      expect(headings).toEqual([
        { id: '-welcome', text: '👋 Welcome', level: 2 },
        { id: '-what-youll-find-here', text: "🧠 What You'll Find Here", level: 2 },
      ]);
    });

    it('should handle headings with special characters', () => {
      const content = `## How This Content Is Approached
## What's Next?`;

      const headings = extractTocHeadings(content);

      expect(headings).toEqual([
        {
          id: 'how-this-content-is-approached',
          text: 'How This Content Is Approached',
          level: 2,
        },
        { id: 'whats-next', text: "What's Next?", level: 2 },
      ]);
    });

    it('should ignore h1 and h4+ headings', () => {
      const content = `# Page Title
## Included H2
### Included H3
#### Not Included H4`;

      const headings = extractTocHeadings(content);

      expect(headings).toEqual([
        { id: 'included-h2', text: 'Included H2', level: 2 },
        { id: 'included-h3', text: 'Included H3', level: 3 },
      ]);
    });

    it('should return empty array for content without headings', () => {
      const content = `Just some regular content
with no headings at all`;

      const headings = extractTocHeadings(content);

      expect(headings).toEqual([]);
    });
  });
});
