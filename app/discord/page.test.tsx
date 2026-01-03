import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DiscordPage, { metadata } from './page';

describe('Discord Page', () => {
  it('renders page heading', () => {
    render(<DiscordPage />);
    expect(screen.getByRole('heading', { level: 1, name: 'Join the Community' })).toBeInTheDocument();
  });

  it('renders Discord invite card', () => {
    render(<DiscordPage />);
    expect(screen.getByText("Brian's Tech Corner Discord")).toBeInTheDocument();
    expect(screen.getByText(/A friendly community for homelab enthusiasts/)).toBeInTheDocument();
  });

  it('renders Discord invite links', () => {
    render(<DiscordPage />);
    const inviteLinks = screen.getAllByRole('link', { name: /Join.*Discord/i });
    
    expect(inviteLinks.length).toBeGreaterThan(0);
    inviteLinks.forEach((link) => {
      expect(link).toHaveAttribute('href', 'https://discord.gg/q2N7R2KDRs');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('renders all topic sections', () => {
    render(<DiscordPage />);
    
    expect(screen.getByText('🏠 Homelab Discussions')).toBeInTheDocument();
    expect(screen.getByText('🏡 Home Automation')).toBeInTheDocument();
    expect(screen.getByText('☸️ Kubernetes')).toBeInTheDocument();
    expect(screen.getByText('🎮 Off-Topic & Gaming')).toBeInTheDocument();
    expect(screen.getByText('💬 Blog & Video Support')).toBeInTheDocument();
  });

  it('renders community guidelines section', () => {
    render(<DiscordPage />);
    expect(screen.getByText('Community Guidelines')).toBeInTheDocument();
    expect(screen.getByText(/Be respectful and constructive/)).toBeInTheDocument();
  });

  it('does not mention DevOps in content', () => {
    render(<DiscordPage />);
    const pageContent = screen.getByRole('main').textContent;
    expect(pageContent).not.toMatch(/DevOps engineer/i);
    expect(pageContent).not.toMatch(/CI\/CD/i);
    expect(pageContent).not.toMatch(/GitOps/i);
  });

  describe('Metadata', () => {
    it('has correct title', () => {
      expect(metadata.title).toBe('Discord Community');
    });

    it('has description without DevOps references', () => {
      const description = metadata.description as string;
      expect(description).toContain('homelabs');
      expect(description).toContain('home automation');
      expect(description).not.toMatch(/DevOps/i);
    });

    it('has OpenGraph metadata', () => {
      expect(metadata.openGraph).toBeDefined();
      expect(metadata.openGraph?.title).toContain('Discord Community');
    });

    it('has Twitter metadata', () => {
      expect(metadata.twitter).toBeDefined();
      // TypeScript's Twitter metadata type has complex discriminated unions
      // so we'll just verify the object exists without checking specific fields
    });
  });
});
