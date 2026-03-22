import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import StartHerePage, { metadata } from './page';

describe('StartHerePage', () => {
  it('renders the page heading', () => {
    render(<StartHerePage />);
    expect(screen.getByRole('heading', { name: /Start Here/i, level: 1 })).toBeInTheDocument();
  });

  it('renders the intro paragraph', () => {
    render(<StartHerePage />);
    expect(screen.getByText(/cuts through the archive/i)).toBeInTheDocument();
  });

  it('renders the about section heading', () => {
    render(<StartHerePage />);
    expect(screen.getByRole('heading', { name: /What is Brian/i })).toBeInTheDocument();
  });

  it('renders the about page link', () => {
    render(<StartHerePage />);
    const link = screen.getByRole('link', { name: /Full about page/i });
    expect(link).toHaveAttribute('href', '/about');
  });

  it('renders a Discord link in the about section', () => {
    render(<StartHerePage />);
    const link = screen.getByRole('link', { name: /Join the Discord$/i });
    expect(link).toHaveAttribute('href', 'https://discord.gg/q2N7R2KDRs');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('renders all four reading path headings', () => {
    render(<StartHerePage />);
    expect(screen.getByRole('heading', { name: /Build a Kubernetes Homelab/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /AI Tooling for Your Homelab/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Platform Engineering/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Home Networking/i })).toBeInTheDocument();
  });

  it('renders four Reading Path badges', () => {
    render(<StartHerePage />);
    const badges = screen.getAllByText('Reading Path');
    expect(badges.length).toBe(4);
  });

  it('renders the MCP post link in the AI Tooling path', () => {
    render(<StartHerePage />);
    const link = screen.getByRole('link', {
      name: /Build Your First MCP Server/i,
    });
    expect(link).toHaveAttribute('href', '/blog/2026-03-21-build-mcp-server-homelab');
  });

  it('renders post links within the Kubernetes path', () => {
    render(<StartHerePage />);
    const homeLabLink = screen.getByRole('link', {
      name: /Planning Your Kubernetes Homelab Hardware/i,
    });
    expect(homeLabLink).toHaveAttribute('href', '/blog/2026-01-03-kubernetes-homelab-part-1-planning-hardware');
  });

  it('renders the Stay Connected section', () => {
    render(<StartHerePage />);
    expect(screen.getByRole('heading', { name: /Stay Connected/i })).toBeInTheDocument();
  });

  it('renders the Discord community card in Stay Connected', () => {
    render(<StartHerePage />);
    const link = screen.getByRole('link', { name: /Discord Community/i });
    expect(link).toHaveAttribute('href', 'https://discord.gg/q2N7R2KDRs');
  });

  it('renders the browse all posts CTA', () => {
    render(<StartHerePage />);
    const link = screen.getByRole('link', { name: /Browse all posts/i });
    expect(link).toHaveAttribute('href', '/blog');
  });
});

describe('StartHerePage metadata', () => {
  it('has the correct title', () => {
    expect(metadata.title).toBe('Start Here');
  });

  it('has a description', () => {
    expect(typeof metadata.description).toBe('string');
    expect((metadata.description as string).length).toBeGreaterThan(0);
  });

  it('has correct OpenGraph title', () => {
    expect((metadata.openGraph as Record<string, unknown>)?.title).toBe(
      "Start Here | Brian's Tech Corner",
    );
  });

  it('has correct Twitter card type', () => {
    expect((metadata.twitter as Record<string, unknown>)?.card).toBe('summary_large_image');
  });
});
