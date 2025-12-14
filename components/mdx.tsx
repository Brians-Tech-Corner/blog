import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import { Callout } from '@/components/Callout';

export const mdxComponents: MDXComponents = {
  a: (props) => {
    const href = String(props.href ?? '');
    const isInternal = href.startsWith('/') || href.startsWith('#');
    if (isInternal) return <Link {...(props as any)} href={href} />;
    return <a {...props} target="_blank" rel="noreferrer" />;
  },
  Callout,
};
