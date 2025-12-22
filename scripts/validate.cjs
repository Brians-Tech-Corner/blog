#!/usr/bin/env node

/**
 * Pre-launch validation script
 * Checks if all required files and configurations are in place
 * 
 * Usage: node scripts/validate.js
 */

const fs = require('fs');
const path = require('path');

const checks = [];
let passCount = 0;
let failCount = 0;
let warnCount = 0;

function check(name, condition, type = 'error') {
  const status = condition ? '✓' : (type === 'warn' ? '⚠' : '✗');
  const color = condition ? '\x1b[32m' : (type === 'warn' ? '\x1b[33m' : '\x1b[31m');
  
  if (condition) passCount++;
  else if (type === 'warn') warnCount++;
  else failCount++;
  
  console.log(`${color}${status}\x1b[0m ${name}`);
  return condition;
}

console.log('🔍 Validating blog setup...\n');

// Check icons
console.log('Icons & Branding:');
check('favicon.ico exists', fs.existsSync(path.join(__dirname, '../public/favicon.ico')));
check('icon-192.png exists', fs.existsSync(path.join(__dirname, '../public/icon-192.png')));
check('icon-512.png exists', fs.existsSync(path.join(__dirname, '../public/icon-512.png')));
check('apple-icon.png exists', fs.existsSync(path.join(__dirname, '../public/apple-icon.png')));

// Check brand assets
console.log('\nBrand Assets:');
check('Logo exists', fs.existsSync(path.join(__dirname, '../public/brand/BTC-Logo--Blue.jpg')));
check('Banner exists', fs.existsSync(path.join(__dirname, '../public/brand/X-Banner-Black.jpg')));

// Check manifest
console.log('\nPWA Support:');
check('manifest.json exists', fs.existsSync(path.join(__dirname, '../public/manifest.json')));

// Check environment
console.log('\nEnvironment:');
const envExample = fs.existsSync(path.join(__dirname, '../.env.example'));
const envLocal = fs.existsSync(path.join(__dirname, '../.env.local'));
check('.env.example exists', envExample);
check('.env.local exists (for local dev)', envLocal, 'warn');

// Check content
console.log('\nContent:');
const blogDir = path.join(__dirname, '../content/blog');
const mdxFiles = fs.existsSync(blogDir) 
  ? fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'))
  : [];
check('At least one blog post exists', mdxFiles.length > 0);

if (mdxFiles.length > 0) {
  // Check first post has required frontmatter
  const firstPost = fs.readFileSync(path.join(blogDir, mdxFiles[0]), 'utf-8');
  check('First post has title', firstPost.includes('title:'));
  check('First post has date', firstPost.includes('date:'));
  check('First post has description', firstPost.includes('description:'), 'warn');
  
  // Check series posts if they exist
  const postsWithSeries = mdxFiles.filter(file => {
    const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
    return content.includes('series:');
  });
  
  if (postsWithSeries.length > 0) {
    let seriesValid = true;
    postsWithSeries.forEach(file => {
      const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
      const hasSeries = content.includes('series:');
      const hasSeriesOrder = content.includes('seriesOrder:');
      if (hasSeries && !hasSeriesOrder) {
        seriesValid = false;
        console.log(`   ⚠ ${file} has series but missing seriesOrder`);
      }
    });
    check('Series posts have seriesOrder', seriesValid, 'warn');
  }
}

// Check package.json scripts
console.log('\nBuild Scripts:');
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));
check('build script exists', !!pkg.scripts?.build);
check('dev script exists', !!pkg.scripts?.dev);
check('start script exists', !!pkg.scripts?.start);

// Check dependencies
console.log('\nDependencies:');
check('next installed', !!pkg.dependencies?.next);
check('react installed', !!pkg.dependencies?.react);
check('next-mdx-remote installed', !!pkg.dependencies?.['next-mdx-remote']);

// Check social media links
console.log('\nSocial Media:');
const footerContent = fs.readFileSync(
  path.join(__dirname, '../components/SiteFooter.tsx'), 
  'utf-8'
);
// Count how many placeholder patterns exist
const placeholderPatterns = [
  'youtube.com/@brianstechcorner',
  'x.com/brianstechcorner',
  'instagram.com/brianstechcorner',
  'github.com/brians-tech-corner'
];
const placeholdersFound = placeholderPatterns.filter(p => footerContent.includes(p)).length;
const allPlaceholders = placeholdersFound === placeholderPatterns.length;

check(
  'Social links configured', 
  !allPlaceholders, 
  placeholdersFound > 0 ? 'warn' : 'pass'
);

// Summary
console.log('\n' + '='.repeat(50));
console.log(`✓ Passed: ${passCount}`);
if (warnCount > 0) console.log(`⚠ Warnings: ${warnCount}`);
if (failCount > 0) console.log(`✗ Failed: ${failCount}`);
console.log('='.repeat(50));

if (failCount > 0) {
  console.log('\n❌ Some critical checks failed!');
  console.log('Review the issues above before deploying.\n');
  console.log('📖 See PRE-LAUNCH.md for detailed checklist');
  process.exit(1);
} else if (warnCount > 0) {
  console.log('\n⚠️  All critical checks passed, but there are warnings.');
  console.log('Review the warnings above for optimal setup.\n');
  console.log('📖 See PRE-LAUNCH.md for detailed checklist');
  process.exit(0);
} else {
  console.log('\n✨ All checks passed! Your blog is ready to deploy! 🚀\n');
  console.log('Next steps:');
  console.log('  1. Set NEXT_PUBLIC_SITE_URL in Vercel');
  console.log('  2. Push to GitHub and deploy');
  console.log('  3. Test on production URL');
  console.log('\n📖 See DEPLOYMENT.md for deployment guide');
  process.exit(0);
}
