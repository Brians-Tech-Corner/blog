# Testing Guide

This project uses [Vitest](https://vitest.dev/) for unit and component testing.

## Running Tests

```bash
# Run all tests once
pnpm test

# Run tests in watch mode (re-runs on file changes)
pnpm test:watch

# Run tests with UI
pnpm test:ui

# Run tests with coverage report
pnpm test:coverage
```

## Test Structure

Tests are co-located with the code they test:
- `lib/posts.test.tsx` - Tests for blog post utilities
- `components/PostCard.test.tsx` - Tests for React components

## Writing Tests

### Testing Utility Functions

```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from './myModule';

describe('myFunction', () => {
  it('should do something', () => {
    const result = myFunction('input');
    expect(result).toBe('expected output');
  });
});
```

### Testing React Components

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

### Mocking Node.js Modules

```typescript
import { vi, Mock } from 'vitest';
import * as fs from 'node:fs/promises';

vi.mock('node:fs/promises', () => ({
  default: {
    readFile: vi.fn(),
  },
}));

// In your test
(fs.default.readFile as Mock).mockResolvedValue('file contents');
```

## Configuration

The test setup is configured in:
- `vitest.config.ts` - Main Vitest configuration
- `vitest.setup.ts` - Test setup file (runs before each test file)

## CI Integration

Tests run automatically in GitHub Actions on every push and pull request. See [.github/workflows/ci.yml](.github/workflows/ci.yml#L48-L79) for the CI configuration.

## Coverage

To generate a coverage report:

```bash
pnpm test:coverage
```

This will generate an HTML report in `coverage/index.html` that you can open in your browser.

## Best Practices

1. **Test behavior, not implementation** - Focus on what the code does, not how it does it
2. **Keep tests simple** - Each test should verify one thing
3. **Use descriptive test names** - Test names should clearly describe what they're testing
4. **Mock external dependencies** - Tests should be isolated and not rely on external services
5. **Test edge cases** - Don't just test the happy path

## Useful Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Documentation](https://testing-library.com/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
