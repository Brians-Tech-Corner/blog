import createMDX from '@next/mdx';

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, if needed
});

export default withMDX(nextConfig);
