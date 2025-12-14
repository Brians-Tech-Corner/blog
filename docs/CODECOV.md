# Codecov Setup

This project uses [Codecov](https://codecov.io) to track code coverage.

## Setup Instructions

1. **Sign up/Login to Codecov**
   - Go to https://codecov.io
   - Sign in with your GitHub account
   - Grant access to the `Brians-Tech-Corner/blog` repository

2. **Get Your Codecov Token**
   - Go to your repository settings on Codecov
   - Copy the upload token

3. **Add Token to GitHub Secrets**
   - Go to your GitHub repository
   - Navigate to Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `CODECOV_TOKEN`
   - Value: Paste your Codecov token
   - Click "Add secret"

4. **That's It!**
   - Coverage reports will automatically upload on every push/PR
   - View coverage reports at: https://codecov.io/gh/Brians-Tech-Corner/blog

## Viewing Coverage

### On Codecov
Visit https://codecov.io/gh/Brians-Tech-Corner/blog to see:
- Overall coverage percentage
- Coverage trends over time
- File-by-file coverage breakdown
- Pull request coverage changes

### Locally
Generate and view coverage locally:
```bash
pnpm test:coverage
# or
make test-coverage
```

Then open `coverage/index.html` in your browser.

### In Pull Requests
Codecov automatically comments on PRs with:
- Coverage change (+/- percentage)
- Files with changed coverage
- Visual diff of coverage changes

## Coverage Thresholds

Current thresholds (in `vitest.config.ts`):
- Lines: 60%
- Functions: 60%
- Branches: 60%
- Statements: 60%

Tests will fail locally if coverage drops below these thresholds.

## Alternative: Coveralls

If you prefer Coveralls instead:

1. Sign up at https://coveralls.io
2. Add your repository
3. Update `.github/workflows/ci.yml`:
   ```yaml
   - name: Upload coverage to Coveralls
     uses: coverallsapp/github-action@v2
     with:
       github-token: ${{ secrets.GITHUB_TOKEN }}
   ```
4. Update README badge:
   ```markdown
   [![Coverage Status](https://coveralls.io/repos/github/Brians-Tech-Corner/blog/badge.svg?branch=main)](https://coveralls.io/github/Brians-Tech-Corner/blog?branch=main)
   ```
