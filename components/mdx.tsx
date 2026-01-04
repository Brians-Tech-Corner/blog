import Link from 'next/link';
import { Callout } from '@/components/Callout';
import { CodeBlock } from '@/components/CodeBlock';
import { Mermaid } from '@/components/Mermaid';
import { ClickableImage } from '@/components/ClickableImage';

export const mdxComponents: Record<string, React.ComponentType<any>> = {
  a: (props) => {
    const href = String(props.href ?? '');
    const isInternal = href.startsWith('/') || href.startsWith('#');
    if (isInternal) return <Link {...(props as any)} href={href} />;
    return <a {...props} target="_blank" rel="noreferrer" />;
  },
  code: ({ children, ...props }) => {
    // For inline code (not inside pre), just render the code element
    // The CSS will handle the styling
    return <code {...props}>{children}</code>;
  },
  pre: ({ children, ...props }) => {
    // Extract code element and its properties with type guards
    const codeElement = Array.isArray(children) ? children[0] : children;
    
    // Safely extract className with proper type checking
    let className = '';
    if (
      codeElement &&
      typeof codeElement === 'object' &&
      'props' in codeElement &&
      codeElement.props &&
      typeof codeElement.props === 'object' &&
      'className' in codeElement.props &&
      typeof codeElement.props.className === 'string'
    ) {
      className = codeElement.props.className;
    }
    
    const filename = props['data-filename'] as string | undefined;
    
    return (
      <CodeBlock className={className} filename={filename}>
        <pre {...props}>{children}</pre>
      </CodeBlock>
    );
  },
  Callout,
  Mermaid,
  ClickableImage,
};
