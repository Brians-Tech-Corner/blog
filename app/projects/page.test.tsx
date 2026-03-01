import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProjectsPage from './page';

describe('ProjectsPage', () => {
  it('renders the page heading', () => {
    render(<ProjectsPage />);
    expect(screen.getByRole('heading', { name: /Projects/i, level: 1 })).toBeInTheDocument();
  });

  it('renders the intro description', () => {
    render(<ProjectsPage />);
    expect(screen.getByText(/Open source tools and side projects/i)).toBeInTheDocument();
  });

  it('renders all three project cards', () => {
    render(<ProjectsPage />);
    expect(screen.getByRole('heading', { name: 'Greybeard', level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'ProxiClaw', level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Herp Ops', level: 2 })).toBeInTheDocument();
  });

  it('renders project taglines', () => {
    render(<ProjectsPage />);
    expect(screen.getByText(/Staff-level AI code review assistant/i)).toBeInTheDocument();
    expect(screen.getByText(/Personal AI assistant/i)).toBeInTheDocument();
    expect(screen.getByText(/Reptile care management SaaS/i)).toBeInTheDocument();
  });

  it('renders active status badges for all projects', () => {
    render(<ProjectsPage />);
    const badges = screen.getAllByText('active');
    expect(badges).toHaveLength(3);
  });

  it('renders Greybeard GitHub and Docs links', () => {
    render(<ProjectsPage />);
    const ghLinks = screen.getAllByRole('link', { name: 'GitHub →' });
    expect(ghLinks.length).toBeGreaterThan(0);
    const greybeardGh = ghLinks.find((l) =>
      l.getAttribute('href')?.includes('btotharye/greybeard'),
    );
    expect(greybeardGh).toBeInTheDocument();

    const docsLinks = screen.getAllByRole('link', { name: 'Docs →' });
    const greybeardDocs = docsLinks.find((l) =>
      l.getAttribute('href')?.includes('readthedocs.io'),
    );
    expect(greybeardDocs).toBeInTheDocument();
  });

  it('renders Herp Ops with App link label', () => {
    render(<ProjectsPage />);
    const appLink = screen.getByRole('link', { name: 'App →' });
    expect(appLink).toHaveAttribute('href', 'https://www.herpops.com');
  });

  it('renders tech tags', () => {
    render(<ProjectsPage />);
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('MCP')).toBeInTheDocument();
    expect(screen.getByText('FastAPI')).toBeInTheDocument();
  });

  it('all external links open in a new tab with rel=noopener', () => {
    render(<ProjectsPage />);
    const externalLinks = screen
      .getAllByRole('link')
      .filter((l) => l.getAttribute('target') === '_blank');
    externalLinks.forEach((link) => {
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
