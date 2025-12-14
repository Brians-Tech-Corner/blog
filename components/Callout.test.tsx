import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Callout } from './Callout';

describe('Callout', () => {
  it('should render info callout by default', () => {
    render(<Callout>This is an info message</Callout>);

    expect(screen.getByText('This is an info message')).toBeInTheDocument();
  });

  it('should render warning callout', () => {
    render(<Callout type="warning">This is a warning</Callout>);

    expect(screen.getByText('This is a warning')).toBeInTheDocument();
  });

  it('should render success callout', () => {
    render(<Callout type="success">This is a success message</Callout>);

    expect(screen.getByText('This is a success message')).toBeInTheDocument();
  });

  it('should render children content', () => {
    render(
      <Callout>
        <strong>Bold text</strong> and regular text
      </Callout>,
    );

    expect(screen.getByText('Bold text')).toBeInTheDocument();
    expect(screen.getByText(/and regular text/)).toBeInTheDocument();
  });
});
