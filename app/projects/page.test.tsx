import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProjectsPage from './page';

describe('ProjectsPage', () => {
  it('renders the page heading', () => {
    render(<ProjectsPage />);
    expect(screen.getByRole('heading', { name: /Projects/i, level: 1 })).toBeInTheDocument();
  });

  it('renders the page description', () => {
    render(<ProjectsPage />);
    expect(screen.getByText(/Open source tools and side projects/i)).toBeInTheDocument();
  });

  it('renders all three project cards', () => {
    render(<ProjectsPage />);
    expect(screen.getByRole('heading', { name: 'Greybeard' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'ProxiClaw' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Herp Ops' })).toBeInTheDocument();
  });

  it('renders project taglines', () => {
    render(<ProjectsPage />);
    expect(screen.getByText(/Staff-level AI code review assistant/i)).toBeInTheDocument();
    expect(screen.getByText(/Personal AI assistant/i)).toBeInTheDocument();
    expect(screen.getByText(/Reptile care management SaaS/i)).toBeInTheDocument();
  });

  it('renders active status badges', () => {
    render(<ProjectsPage />);
    const badges = screen.getAllByText('active');
    expect(badges.length).toBeGreaterThanOrEqual(3);
  });

  it('renders Greybeard GitHub and docs links', () => {
    render(<ProjectsPage />);
    const githubLinks = screen.getAllByRole('link', { name: /GitHub →/i });
    expect(githubLinks.length).toBeGreaterThan(0);
    expect(githubLinks[0]).toHaveAttribute('href', 'https://github.com/btotharye/greybeard');

    const docsLink = screen.getByRole('link', { name: /Docs →/i });
    expect(docsLink).toHaveAttribute('href', 'https://greybeard.readthedocs.io');
  });

  it('renders Herp Ops App link', () => {
    render(<ProjectsPage />);
    const appLink = screen.getByRole('link', { name: /App →/i });
    expect(appLink).toHaveAttribute('href', 'https://www.herpops.com');
  });

  it('renders tech tags for each project', () => {
    render(<ProjectsPage />);
    // Python appears in both Greybeard and Herp Ops
    const pythonTags = screen.getAllByText('Python');
    expect(pythonTags.length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('MCP')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('FastAPI')).toBeInTheDocument();
  });

  it('all external links open in new tab with rel=noopener', () => {
    render(<ProjectsPage />);
    const externalLinks = screen
      .getAllByRole('link')
      .filter((l) => l.getAttribute('href')?.startsWith('http'));
    externalLinks.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
