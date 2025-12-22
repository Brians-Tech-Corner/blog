import Link from 'next/link';
import { Callout } from '@/components/Callout';
import { CodeBlock } from '@/components/CodeBlock';

export const mdxComponents: Record<string, React.ComponentType<any>> = {
  a: (props) => {
    const href = String(props.href ?? '');
    const isInternal = href.startsWith('/') || href.startsWith('#');
    if (isInternal) return <Link {...(props as any)} href={href} />;
    return <a {...props} target="_blank" rel="noreferrer" />;
  },
  pre: ({ children, ...props }) => {
    // Extract code element and its properties
    const codeElement = Array.isArray(children) ? children[0] : children;
    const className = codeElement?.props?.className || '';
    const filename = props['data-filename'] as string | undefined;
    
    return (
      <CodeBlock className={className} filename={filename}>
        <pre {...props}>{children}</pre>
      </CodeBlock>
    );
  },
  Callout,
};
